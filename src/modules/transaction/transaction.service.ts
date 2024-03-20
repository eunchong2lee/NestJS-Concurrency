import { Injectable } from '@nestjs/common';
import { MockRepository } from '../mock/mock.repository';
import { QueryRunner } from 'typeorm';
import { Mock } from '../mock/entities/mock.entity';
import { IsolationLevel } from 'typeorm/driver/types/IsolationLevel';

@Injectable()
export class TransactionService {
  constructor(private readonly mockRepository: MockRepository) {}

  async rollback() {
    try {
      const commited_data = await this.mockRepository.rollbackTransaction(
        'READ UNCOMMITTED',
        async (queryRunner) => {
          return await this.dirtyReadSecondTransaction(queryRunner);
        },
      );

      const rollback_check_data = await this.mockRepository.findOne({
        where: { id: 2 },
      });

      return { commited_data, rollback_check_data };
    } catch (err) {
      console.log(err);
    }
  }

  async dirtyReadTest() {
    return await this.dirtyRead('READ UNCOMMITTED');
  }

  async nonRepeatableReadTest() {
    // x값을 두번 바꿈, x에 값을 더함
    return await this.nonRepeatableRead('READ UNCOMMITTED');
  }

  async phantomReadTest() {
    return await this.phantomRead('READ UNCOMMITTED');
  }

  async readUncomitted() {
    return await this.dirtyRead('READ UNCOMMITTED');
  }

  async readComitted() {
    return await this.dirtyRead('READ COMMITTED');
  }

  async repeatableRead() {
    return await this.nonRepeatableRead('REPEATABLE READ');
  }

  async serializable() {
    return await this.phantomRead('SERIALIZABLE');
  }

  async dirtyRead(isolation_level: IsolationLevel) {
    await Promise.all([
      this.mockRepository.runTransaction(
        isolation_level,
        async (queryRunner) => {
          return await this.dirtyReadFirstTransaction(queryRunner);
        },
      ),
      this.mockRepository.rollbackTransaction(
        isolation_level,
        async (queryRunner) => {
          return await this.dirtyReadSecondTransaction(queryRunner);
        },
      ),
    ]);

    const [first_data, second_data] = await Promise.all([
      this.mockRepository.findOne({ where: { id: 1 } }),
      this.mockRepository.findOne({ where: { id: 2 } }),
    ]);
    // x+y , y change
    return { first_data, second_data };
  }

  async nonRepeatableRead(isolation_level: IsolationLevel) {
    const [first, second] = await Promise.all([
      this.mockRepository.runTransaction(
        isolation_level,
        async (queryRunner) => {
          return await this.nonRepeatableReadFristTransaction(queryRunner);
        },
      ),
      this.mockRepository.runTransaction(
        isolation_level,
        async (queryRunner) => {
          return await this.nonRepeatableReadSecondTransaction(queryRunner);
        },
      ),
    ]);
    return first;
  }

  async phantomRead(isolation_level: IsolationLevel) {
    const [first_transaction, second_trasaction] = await Promise.all([
      this.mockRepository.runTransaction(
        isolation_level,
        async (queryRunner) => {
          return await this.phantomReadFristTransaction(queryRunner);
        },
      ),
      this.mockRepository.runTransaction(
        isolation_level,
        async (queryRunner) => {
          return await this.phantomReadSecondTransaction(queryRunner);
        },
      ),
    ]);
    return first_transaction;
  }

  async dirtyReadFirstTransaction(queryRunner: QueryRunner) {
    const first_mock = await this.mockRepository.queryRunnerFindOne(
      queryRunner,
      { where: { id: 1 } },
    );

    await this.sleep(2000);

    const second_mock = await this.mockRepository.queryRunnerFindOne(
      queryRunner,
      { where: { id: 2 } },
    );
    const update_data = await this.mockRepository.queryRunnerUpdate(
      queryRunner,
      first_mock.id,
      { value: first_mock.value + second_mock.value },
    );

    return update_data;
  }

  async dirtyReadSecondTransaction(queryRunner: QueryRunner) {
    await this.sleep(1000);
    const update_data = await this.mockRepository.queryRunnerUpdate(
      queryRunner,
      2,
      {
        value: 300,
      },
    );

    await this.sleep(4000);

    return update_data;
  }

  async nonRepeatableReadFristTransaction(queryRunner: QueryRunner) {
    const first_find_mock = await this.mockRepository.queryRunnerFindOne(
      queryRunner,
      {
        where: { id: 1 },
      },
    );

    await this.sleep(3000);

    const second_find_mock = await this.mockRepository.queryRunnerFindOne(
      queryRunner,
      {
        where: { id: 1 },
      },
    );

    return { first_find_mock, second_find_mock };
  }

  async nonRepeatableReadSecondTransaction(queryRunner: QueryRunner) {
    await this.sleep(1000);

    const find_mock = await this.mockRepository.queryRunnerFindOne(
      queryRunner,
      {
        where: { id: 1 },
      },
    );

    await this.mockRepository.queryRunnerUpdate(queryRunner, 1, {
      value: 50,
    });

    return find_mock;
  }

  async phantomReadFristTransaction(queryRunner: QueryRunner) {
    const first_find_data = await this.mockRepository.queryRunnerFind(
      queryRunner,
      { where: { value: 20 } },
    );

    await this.sleep(3000);

    const second_find_data = await this.mockRepository.queryRunnerFind(
      queryRunner,
      { where: { value: 20 } },
    );
    return { first_find_data, second_find_data };
  }

  async phantomReadSecondTransaction(queryRunner: QueryRunner) {
    await this.sleep(1000);
    await this.mockRepository.queryRunnerUpdate(queryRunner, 2, { value: 20 });
    return 'complete';
  }

  async sleep(ms: number): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, ms));
  }
}

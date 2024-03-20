import { Injectable } from '@nestjs/common';
import { MockRepository } from '../mock/mock.repository';
import { QueryRunner } from 'typeorm';
import { Mock } from '../mock/entities/mock.entity';

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

  async dirtyRead() {
    await Promise.all([
      this.mockRepository.runTransaction(
        'READ UNCOMMITTED',
        async (queryRunner) => {
          return await this.dirtyReadFirstTransaction(queryRunner);
        },
      ),
      this.mockRepository.rollbackTransaction(
        'READ UNCOMMITTED',
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

  async nonRepeatableRead() {
    // x값을 두번 바꿈, x에 값을 더함
    const [first, second] = await Promise.all([
      this.mockRepository.runTransaction(
        'READ COMMITTED',
        async (queryRunner) => {
          return await this.nonRepeatableReadFristTransaction(queryRunner);
        },
      ),
      this.mockRepository.runTransaction(
        'READ COMMITTED',
        async (queryRunner) => {
          return await this.nonRepeatableReadSecondTransaction(queryRunner);
        },
      ),
    ]);
    return first;
  }

  async phantomRead() {
    // 값이 ?인 것을 두번 읽음, 값을 ?로바꿈
    return;
  }

  async readUncomitted() {
    await Promise.all([
      this.mockRepository.runTransaction(
        'READ UNCOMMITTED',
        async (queryRunner) => {
          return await this.dirtyReadFirstTransaction(queryRunner);
        },
      ),
      this.mockRepository.rollbackTransaction(
        'READ UNCOMMITTED',
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

  async readComitted() {
    await Promise.all([
      this.mockRepository.runTransaction(
        'READ COMMITTED',
        async (queryRunner) => {
          return await this.dirtyReadFirstTransaction(queryRunner);
        },
      ),
      this.mockRepository.rollbackTransaction(
        'READ COMMITTED',
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

  async repeatableRead() {
    const [first, second] = await Promise.all([
      this.mockRepository.runTransaction(
        'REPEATABLE READ',
        async (queryRunner) => {
          return await this.nonRepeatableReadFristTransaction(queryRunner);
        },
      ),
      this.mockRepository.runTransaction(
        'REPEATABLE READ',
        async (queryRunner) => {
          return await this.nonRepeatableReadSecondTransaction(queryRunner);
        },
      ),
    ]);
    return first;
  }

  async serializable() {
    return;
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

  async sleep(ms: number): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, ms));
  }
}

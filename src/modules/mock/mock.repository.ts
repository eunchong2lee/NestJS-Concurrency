import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, QueryRunner, Repository } from 'typeorm';
import { Mock } from './entities/mock.entity';
import { IsolationLevelType } from '../transaction/type/isolationLevel.type';

@Injectable()
export class MockRepository {
  constructor(
    @InjectRepository(Mock)
    private mockRepository: Repository<Mock>,

    @InjectDataSource() private readonly dataSource: DataSource,
  ) {}
  async save(options) {
    return await this.mockRepository.save(options);
  }

  async find(options) {
    return await this.mockRepository.find(options);
  }

  async findOne(options) {
    return await this.mockRepository.findOne(options);
  }

  async update(id, options) {
    return await this.mockRepository.update(id, options);
  }

  async delete(id) {
    return await this.mockRepository.delete(id);
  }

  async query(options) {
    return await this.mockRepository.query(options);
  }

  async queryRunnerSave(queryRunner: QueryRunner, options) {
    return await queryRunner.manager.save(Mock, options);
  }

  async queryRunnerUpdate(queryRunner: QueryRunner, id, options) {
    return await queryRunner.manager.update(Mock, id, options);
  }

  async queryRunnerFind(queryRunner: QueryRunner, options) {
    return await queryRunner.manager.find(Mock, options);
  }

  async queryRunnerFindOne(queryRunner: QueryRunner, options) {
    return await queryRunner.manager.findOne(Mock, options);
  }

  async runTransaction<T>(
    isolation_level,
    callback: (queryRunner: QueryRunner) => Promise<T>,
  ): Promise<T> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction(isolation_level);
    try {
      const result = await callback(queryRunner);
      await queryRunner.commitTransaction();
      return result;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async rollbackTransaction<T>(
    isolation_level: IsolationLevelType,
    callback: (queryRunner: QueryRunner) => Promise<T>,
  ): Promise<T> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction(isolation_level);
    try {
      const result = await callback(queryRunner);
      await queryRunner.rollbackTransaction();
      return result;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }
}

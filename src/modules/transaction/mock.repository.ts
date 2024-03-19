import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, QueryRunner, Repository } from 'typeorm';
import { Mock } from './entities/mock.entity';

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

  async createQueryRunner() {
    return this.dataSource.createQueryRunner();
  }

  async runTransaction<T>(
    callback: (queryRunner: QueryRunner) => Promise<T>,
  ): Promise<T> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction('SERIALIZABLE');
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
}

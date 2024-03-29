import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, QueryRunner, Repository } from 'typeorm';
import { Reservation } from './entities/reservation.entity';

@Injectable()
export class ReservationRepository {
  constructor(
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>,

    @InjectDataSource() private readonly dataSource: DataSource,
  ) {}
  async save(options) {
    return await this.reservationRepository.save(options);
  }

  async find(options) {
    return await this.reservationRepository.find(options);
  }

  async findOne(options) {
    return await this.reservationRepository.findOne(options);
  }

  async update(id, options) {
    return await this.reservationRepository.update(id, options);
  }

  async delete(id) {
    return await this.reservationRepository.delete(id);
  }

  async query(options) {
    return await this.reservationRepository.query(options);
  }

  async queryRunnerSave(queryRunner: QueryRunner, options) {
    return await queryRunner.manager.save(Reservation, options);
  }

  async queryRunnerUpdate(queryRunner: QueryRunner, id, options) {
    return await queryRunner.manager.update(Reservation, id, options);
  }

  async queryRunnerFind(queryRunner: QueryRunner, options) {
    return await queryRunner.manager.find(Reservation, options);
  }

  async queryRunnerFindOne(queryRunner: QueryRunner, options) {
    return await queryRunner.manager.findOne(Reservation, options);
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

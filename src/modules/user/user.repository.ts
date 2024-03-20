import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async save(options) {
    return await this.userRepository.save(options);
  }

  async find(options) {
    return await this.userRepository.find(options);
  }

  async findOne(options) {
    return await this.userRepository.findOne(options);
  }

  async update(id, options) {
    return await this.userRepository.update(id, options);
  }

  async remove(user: User) {
    return await this.userRepository.remove(user);
  }

  async query(options) {
    return await this.userRepository.query(options);
  }

  async queryRunnerSave(queryRunner: QueryRunner, options) {
    return await queryRunner.manager.save(User, options);
  }

  async queryRunnerUpdate(queryRunner: QueryRunner, id, options) {
    return await queryRunner.manager.update(User, id, options);
  }

  async queryRunnerFind(queryRunner: QueryRunner, options) {
    return await queryRunner.manager.find(User, options);
  }

  async queryRunnerFindOne(queryRunner: QueryRunner, options) {
    return await queryRunner.manager.findOne(User, options);
  }
}

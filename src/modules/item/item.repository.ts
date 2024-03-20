import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { Item } from './entities/item.entity';

@Injectable()
export class ItemRepository {
  constructor(
    @InjectRepository(Item)
    private itemRepository: Repository<Item>,
  ) {}
  async save(options) {
    return await this.itemRepository.save(options);
  }

  async find(options) {
    return await this.itemRepository.find(options);
  }

  async findOne(options) {
    return await this.itemRepository.findOne(options);
  }

  async update(id, options) {
    return await this.itemRepository.update(id, options);
  }

  async remove(item: Item) {
    return await this.itemRepository.remove(item);
  }

  async query(options) {
    return await this.itemRepository.query(options);
  }

  async queryRunnerSave(queryRunner: QueryRunner, options) {
    return await queryRunner.manager.save(Item, options);
  }

  async queryRunnerUpdate(queryRunner: QueryRunner, id, options) {
    return await queryRunner.manager.update(Item, id, options);
  }

  async queryRunnerFind(queryRunner: QueryRunner, options) {
    return await queryRunner.manager.find(Item, options);
  }

  async queryRunnerFindOne(queryRunner: QueryRunner, options) {
    return await queryRunner.manager.findOne(Item, options);
  }
}

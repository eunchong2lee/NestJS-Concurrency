import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
}

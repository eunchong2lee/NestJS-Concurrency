import { Injectable } from '@nestjs/common';
import { Item } from './entities/item.entity';
import { ItemRepository } from './item.repository';

@Injectable()
export class ItemService {
  constructor(private readonly itemRepository: ItemRepository) {}

  async findAll(): Promise<Item[]> {
    let options;
    return await this.itemRepository.find(options);
  }

  async findOne(id: number): Promise<Item> {
    return await this.itemRepository.findOne(id);
  }

  async create(item: Item): Promise<Item> {
    return await this.itemRepository.save(item);
  }

  async remove(id: number): Promise<void> {
    await this.itemRepository.delete(id);
  }
}

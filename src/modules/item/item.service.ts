import { BadRequestException, Injectable } from '@nestjs/common';
import { Item } from './entities/item.entity';
import { ItemRepository } from './item.repository';
import exceptions from '../../common/exceptions/exceptions';
import { createItemDto } from './dto/createItem.dto';

@Injectable()
export class ItemService {
  constructor(private readonly itemRepository: ItemRepository) {}

  async findAll(): Promise<Item[]> {
    return await this.itemRepository.find('');
  }

  async findOne(id: number): Promise<Item> {
    return await this.itemRepository.findOne({
      where: { id },
    });
  }

  async create(item: createItemDto): Promise<Item> {
    try {
      return await this.itemRepository.save(item);
    } catch (err) {}
  }

  async remove(id: number) {
    try {
      const item = await this.findOne(id);
      if (!item) throw exceptions.Item.NoExistsItem;

      return await this.itemRepository.remove(item);
    } catch (err) {
      throw new BadRequestException('Bad Request');
    }
  }
}

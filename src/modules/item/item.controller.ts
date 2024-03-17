import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { Item } from './entities/item.entity';
import { ItemService } from './item.service';

@Controller('items')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get()
  findAll(): Promise<Item[]> {
    return this.itemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Item> {
    return this.itemService.findOne(+id);
  }

  @Post()
  create(@Body() item: Item): Promise<Item> {
    return this.itemService.create(item);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.itemService.remove(+id);
  }
}
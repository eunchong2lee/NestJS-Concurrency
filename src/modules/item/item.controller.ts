import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { Item } from './entities/item.entity';
import { ItemService } from './item.service';
import { createItemDto } from './dto/createItem.dto';

@Controller('items')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get()
  async findAll(): Promise<Item[]> {
    return await this.itemService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Item> {
    return await this.itemService.findOne(id);
  }

  @Post()
  async create(@Body() item: createItemDto): Promise<Item> {
    console.log(item);
    return await this.itemService.create(item);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.itemService.remove(id);
  }
}

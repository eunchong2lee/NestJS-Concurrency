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
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Item')
@Controller('items')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get()
  @ApiOperation({ summary: ' get All Items', description: 'get All Items' })
  @ApiOkResponse({ description: 'get All Items', type: [Item] })
  async findAll(): Promise<Item[]> {
    return await this.itemService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get One Item',
    description: 'FindOne Item By item_id',
  })
  @ApiParam({
    name: 'id',
    description: 'item_id',
    example: 1,
    type: Number,
    required: true,
  })
  @ApiOkResponse({ description: 'findOne Item by item_id', type: Item })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Item> {
    return await this.itemService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'create item', description: 'create item' })
  @ApiBody({ type: createItemDto })
  @ApiOkResponse({ description: 'complete created', type: Item })
  async create(@Body() item: createItemDto): Promise<Item> {
    console.log(item);
    return await this.itemService.create(item);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'delete item by id',
    description: 'delete item by id',
  })
  @ApiParam({
    name: 'id',
    description: 'item_id',
    example: 1,
    type: Number,
    required: true,
  })
  @ApiOkResponse({ description: 'complete deleted' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.itemService.remove(id);
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { MockService } from './mock.service';
import { createMockDto } from './dto/createMock.dto';

@Controller('mocks')
export class MockController {
  constructor(private readonly mockService: MockService) {}

  @Get()
  async findAll() {
    return this.mockService.findAll();
  }

  @Post()
  async create(@Body() mock: createMockDto) {
    return this.mockService.create(mock);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.mockService.remove(id);
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { MockService } from './mock.service';
import { createMockDto } from './dto/createMock.dto';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Mock } from './entities/mock.entity';

@ApiTags('Mock data')
@Controller('mocks')
export class MockController {
  constructor(private readonly mockService: MockService) {}

  @Get()
  @ApiOperation({
    summary: ' get All mocks data',
    description: 'get All mocks data',
  })
  @ApiOkResponse({ description: 'get All Mocks', type: [Mock] })
  async findAll() {
    return this.mockService.findAll();
  }

  @Patch('initialize')
  @ApiOperation({
    summary: 'initialize mock data',
    description:
      'if you first run time create Mock data, else initialize mock data \n why : we have to test transactions so initialize mock data',
  })
  async initialize() {
    return this.mockService.initialize();
  }

  @Post()
  @ApiOperation({ summary: 'create mock', description: 'create mock' })
  @ApiBody({ type: createMockDto })
  @ApiOkResponse({ description: 'complete created', type: Mock })
  async create(@Body() mock: createMockDto) {
    return this.mockService.create(mock);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'delete mock by id',
    description: 'delete mock by id',
  })
  @ApiParam({
    name: 'id',
    description: 'mock_id',
    example: 1,
    type: Number,
    required: true,
  })
  @ApiOkResponse({ description: 'complete deleted' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.mockService.remove(id);
  }
}

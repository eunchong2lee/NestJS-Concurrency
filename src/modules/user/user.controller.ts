import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { createUserDto } from './dto/createUser.dto';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('')
  @ApiOperation({
    summary: 'get All Users',
    description: 'get All Users',
  })
  @ApiOkResponse({ description: 'get All Users', type: [User] })
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get One User',
    description: 'FindOne User By user_id',
  })
  @ApiParam({
    name: 'id',
    description: 'user_id',
    example: 1,
    type: Number,
    required: true,
  })
  @ApiOkResponse({ description: 'findOne User by user_id', type: User })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return await this.userService.findOne(id);
  }

  @Post('')
  @ApiOperation({ summary: 'create user', description: 'create user' })
  @ApiBody({ type: createUserDto })
  @ApiOkResponse({ description: 'complete created', type: User })
  async create(@Body() user: createUserDto): Promise<User> {
    return await this.userService.create(user);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'delete user by id',
    description: 'delete user by id',
  })
  @ApiParam({
    name: 'id',
    description: 'user_id',
    example: 1,
    type: Number,
    required: true,
  })
  @ApiOkResponse({ description: 'complete deleted' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.remove(id);
  }
}

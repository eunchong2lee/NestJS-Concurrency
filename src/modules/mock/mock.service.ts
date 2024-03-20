import { Injectable } from '@nestjs/common';
import { MockRepository } from './mock.repository';
import { createMockDto } from './dto/createMock.dto';

@Injectable()
export class MockService {
  constructor(private readonly mockRepository: MockRepository) {}

  async findAll() {
    return await this.mockRepository.find('');
  }

  async create(mock: createMockDto) {
    return await this.mockRepository.save(mock);
  }

  async remove(id: number) {
    return await this.mockRepository.delete(id);
  }
}

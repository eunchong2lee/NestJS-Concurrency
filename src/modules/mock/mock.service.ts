import { Injectable } from '@nestjs/common';
import { MockRepository } from './mock.repository';
import { createMockDto } from '../transaction/dto/createMock.dto';

@Injectable()
export class MockService {
  constructor(private readonly mockRepository: MockRepository) {}

  async create(mock: createMockDto) {
    return await this.mockRepository.save(mock);
  }

  async remove() {
    return await this.mockRepository.delete('');
  }
}

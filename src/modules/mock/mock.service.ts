import { Injectable } from '@nestjs/common';
import { MockRepository } from './mock.repository';
import { createMockDto } from './dto/createMock.dto';

@Injectable()
export class MockService {
  constructor(private readonly mockRepository: MockRepository) {}

  async findAll() {
    return await this.mockRepository.find('');
  }

  async initialize() {
    const mocks = await this.mockRepository.find('');
    if (!mocks.length) {
      await Promise.all([
        this.mockRepository.save({ value: 20 }),
        this.mockRepository.save({ value: 200 }),
        this.mockRepository.save({ value: 20 }),
        this.mockRepository.save({ value: 20 }),
      ]);
    }

    await Promise.all([
      this.mockRepository.update(1, { value: 20 }),
      this.mockRepository.update(2, { value: 200 }),
      this.mockRepository.update(3, { value: 20 }),
      this.mockRepository.update(4, { value: 20 }),
    ]);

    return 'complete';
  }

  async create(mock: createMockDto) {
    return await this.mockRepository.save(mock);
  }

  async remove(id: number) {
    return await this.mockRepository.delete([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  }
}

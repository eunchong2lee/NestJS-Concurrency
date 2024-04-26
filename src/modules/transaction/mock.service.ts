import { Injectable } from '@nestjs/common';
import { MockRepository } from './mock.repository';

@Injectable()
export class TransactionService {
  constructor(private readonly mockRepository: MockRepository) {}

  async create() {
    return await this.mockRepository.save('');
  }

  async remove() {
    return await this.mockRepository.delete('');
  }
}

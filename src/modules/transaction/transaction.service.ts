import { Injectable } from '@nestjs/common';
import { MockRepository } from './mock.repository';

@Injectable()
export class TransactionService {
  constructor(private readonly mockRepository: MockRepository) {}

  async dirtyRead() {
    return;
  }

  async nonRepeatableRead() {
    return;
  }

  async phantomRead() {
    return;
  }

  async readUncomitted() {
    return;
  }

  async readComitted() {
    return;
  }

  async repeatableRead() {
    return;
  }

  async serializable() {
    return;
  }
}

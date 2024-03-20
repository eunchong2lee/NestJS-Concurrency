import { Injectable } from '@nestjs/common';
import { MockRepository } from '../mock/mock.repository';
import { QueryRunner } from 'typeorm';

@Injectable()
export class TransactionService {
  constructor(private readonly mockRepository: MockRepository) {}

  async dirtyRead() {
    // x+y , y change
    return;
  }

  async nonRepeatableRead() {
    // x값을 두번 바꿈, x에 값을 더함
    return;
  }

  async phantomRead() {
    // 값이 ?인 것을 두번 읽음, 값을 ?로바꿈
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

  async dirtyReadFirstTransaction(queryRunner: QueryRunner) {
    return;
  }

  async dirtyReadSecondTransaction(queryRunner: QueryRunner) {
    return;
  }

  async sleep(ms: number): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, ms));
  }
}

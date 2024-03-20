import { Controller, Get } from '@nestjs/common';
import { TransactionService } from './transaction.service';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get('rollback')
  async rollback() {
    return this.transactionService.rollback();
  }

  @Get('phenomena/dirty-read')
  async dirtyRead() {
    return this.transactionService.dirtyReadTest();
  }

  @Get('phenomena/non-repeatable-read')
  async nonRepeatableRead() {
    return this.transactionService.nonRepeatableReadTest();
  }

  @Get('phenomena/phantom-read')
  async phantomRead() {
    return this.transactionService.phantomReadTest();
  }

  @Get('isolation-level/read-uncommitted')
  async readUncomitted() {
    return this.transactionService.readUncomitted();
  }

  @Get('isolation-level/read-committed')
  async readComitted() {
    return this.transactionService.readComitted();
  }

  @Get('isolation-level/repeatable-read')
  async repeatableRead() {
    return this.transactionService.repeatableRead();
  }

  @Get('isolation-level/serializable')
  async serializable() {
    return this.transactionService.serializable();
  }
}

import { Controller, Get } from '@nestjs/common';
import { TransactionService } from './transaction.service';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get('rollback')
  async rollback() {
    return this.transactionService.rollback();
  }

  @Get('dirty-read')
  async dirtyRead() {
    return this.transactionService.dirtyRead();
  }

  @Get('non-repeatable-read')
  async nonRepeatableRead() {
    return this.transactionService.nonRepeatableRead();
  }

  @Get('phantom-read')
  async phantomRead() {
    return this.transactionService.phantomRead();
  }

  @Get('read-uncommitted')
  async readUncomitted() {
    return this.transactionService.readUncomitted();
  }

  @Get('read-committed')
  async readComitted() {
    return this.transactionService.readComitted();
  }

  @Get('repeatable-read')
  async repeatableRead() {
    return this.transactionService.repeatableRead();
  }

  @Get('serializable')
  async serializable() {
    return this.transactionService.serializable();
  }
}

import { Controller, Get } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('transaction Test')
@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get('rollback')
  async rollback() {
    return this.transactionService.rollback();
  }

  @Get('phenomena/dirty-read')
  @ApiOperation({
    summary: 'phenomena Dirty-read',
    description: `
    if you initialize mock data
    first data value : 20
    second data value: 200
    so i do first transaction first data + second data
    but doing first transaction,, second transaction change second mock data & rollback
    i want first data value: 220 second data value: 200
       `,
  })
  @ApiOkResponse({
    description: 'this is dirty read',
  })
  async dirtyRead() {
    return this.transactionService.dirtyReadTest();
  }

  @Get('phenomena/non-repeatable-read')
  @ApiOperation({
    summary: 'phenomena non-repeatable-read',
    description: `
    if you initialize mock data
    mock data value : 20
    so i do first transaction get twice mock data
    but doing first transaction,, second transaction change mock data
    i want first find value: 20 second find value: 20
       `,
  })
  @ApiOkResponse({
    description: 'this is non-repeatable-read',
  })
  async nonRepeatableRead() {
    return this.transactionService.nonRepeatableReadTest();
  }

  @Get('phenomena/phantom-read')
  @ApiOperation({
    summary: 'phenomena phantomRead',
    description: `
    if you initialize mock data

    so i do first transaction get twice find By mock data value : 20
    but doing first transaction,, second transaction change somone mock data value:20
    i want mock data by value: 20 but second get data added data
       `,
  })
  @ApiOkResponse({
    description: 'this is phantomRead',
  })
  async phantomRead() {
    return this.transactionService.phantomReadTest();
  }

  @Get('isolation-level/read-uncommitted')
  @ApiOperation({
    summary: 'phenomena Dirty-read by isolation-level/read-uncommitted',
    description: `
    if you initialize mock data
    first data value : 20
    second data value: 200
    so i do first transaction first data + second data
    but doing first transaction,, second transaction change second mock data & rollback
    i want first data value: 220 second data value: 200
       `,
  })
  @ApiOkResponse({
    description: 'this is dirty read by isolation-level/read-uncommitted',
  })
  async readUncomitted() {
    return this.transactionService.readUncomitted();
  }

  @Get('isolation-level/read-committed')
  @ApiOperation({
    summary: 'phenomena Dirty-read by isolation-level/read-committed',
    description: `
    if you initialize mock data
    first data value : 20
    second data value: 200
    so i do first transaction first data + second data
    but doing first transaction,, second transaction change second mock data & rollback
    i want first data value: 220 second data value: 200
       `,
  })
  @ApiOkResponse({
    description: `this is dirty read by isolation-level/read-committed
    no phenomena Dirty-read`,
  })
  async readComitted() {
    return this.transactionService.readComitted();
  }

  @Get('isolation-level/repeatable-read')
  @ApiOperation({
    summary: ' phenomena nonRepeatableRead by isolation-level/repeatable-read',
    description: `
    if you initialize mock data
    mock data value : 20
    so i do first transaction get twice mock data
    but doing first transaction,, second transaction change mock data
    i want first find value: 20 second find value: 20
       `,
  })
  @ApiOkResponse({
    description: `this is non-repeatable-read by isolation-level/repeatable-read
    no phenomena non repeatabe read `,
  })
  async repeatableRead() {
    return this.transactionService.repeatableRead();
  }

  @Get('isolation-level/serializable')
  @ApiOperation({
    summary: 'phenomena phantomRead by isolation-level/serializable',
    description: `
    if you initialize mock data

    so i do first transaction get twice find By mock data value : 20
    but doing first transaction,, second transaction change somone mock data value:20
    i want mock data by value: 20 but second get data added data
       `,
  })
  @ApiOkResponse({
    description: `this is phantomRead by isolation-level/serializable
    no phenomena phantomRead
    `,
  })
  async serializable() {
    return this.transactionService.serializable();
  }
}

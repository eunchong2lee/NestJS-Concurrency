import { Module, forwardRef } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { MockModule } from '../mock/mock.module';

@Module({
  imports: [forwardRef(() => MockModule)],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule {}

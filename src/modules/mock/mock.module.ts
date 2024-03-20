import { Module } from '@nestjs/common';
import { MockController } from './mock.controller';
import { MockService } from './mock.service';
import { MockRepository } from './mock.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mock } from './entities/mock.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Mock])],
  controllers: [MockController],
  providers: [MockService, MockRepository],
  exports: [MockRepository],
})
export class MockModule {}

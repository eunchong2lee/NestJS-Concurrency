import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './config/typeorm.config';
import { UserModule } from './modules/user/user.module';
import { ItemModule } from './modules/item/item.module';
import { ReservationModule } from './modules/reservation/reservation.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    UserModule,
    ItemModule,
    ReservationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

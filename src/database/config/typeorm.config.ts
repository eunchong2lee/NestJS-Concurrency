import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import 'dotenv/config';
import { join } from 'path';
import { Item } from 'src/modules/item/entities/item.entity';
import { Mock } from 'src/modules/mock/entities/mock.entity';
import { Reservation } from 'src/modules/reservation/entities/reservation.entity';
import { User } from 'src/modules/user/entities/user.entity';

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [User, Item, Reservation, Mock],
  migrations: [__dirname + '/src/database/migrations/*{.ts,.js}'],
  migrationsRun: false,
  logging: true,
  synchronize: true,
};

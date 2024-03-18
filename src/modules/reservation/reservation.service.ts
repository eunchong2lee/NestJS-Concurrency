import { Injectable } from '@nestjs/common';
import { Reservation } from './entities/reservation.entity';
import { ReservationRepository } from './reservation.repository';
import { createResevationDto } from './dto/createReservation.dto';
import { ItemRepository } from '../item/item.repository';
import { UserRepository } from '../user/user.repository';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Item } from '../item/entities/item.entity';
import exceptions from 'src/common/exceptions/exceptions';

@Injectable()
export class ReservationService {
  constructor(
    private readonly reservationRepository: ReservationRepository,
    private readonly userRepository: UserRepository,
    private readonly itemRepository: ItemRepository,

    @InjectDataSource() private readonly dataSource: DataSource,
  ) {}

  async findAll(): Promise<Reservation[]> {
    return await this.reservationRepository.find('');
  }

  async findOne(id: number): Promise<Reservation> {
    return await this.reservationRepository.findOne({
      where: { id },
      relations: ['user', 'item'],
    });
  }

  async create(reservation: createResevationDto): Promise<Reservation> {
    const { user_id, item_id } = reservation;
    console.log('just ==========');
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();

    await queryRunner.startTransaction('SERIALIZABLE');

    try {
      const [user, item] = await Promise.all([
        this.userRepository.findOne({ where: { id: user_id } }),
        queryRunner.manager.findOne(Item, {
          where: { id: item_id },
          lock: { mode: 'pessimistic_write' },
        }),
      ]);

      if (!user || !item) {
        throw new Error('No Exist User Or Item');
      }

      if (!item.quantity) {
        throw new Error('No Exist Item Quantity');
      }

      const updatedItem = await queryRunner.manager.update(Item, item.id, {
        quantity: item.quantity - 1,
      });

      const createReservation = await queryRunner.manager.save(Reservation, {
        user: user,
        item: item,
      });

      await queryRunner.commitTransaction();

      return createReservation;
    } catch (err) {
      await queryRunner.rollbackTransaction();

      if (err.message === 'No Exist User Or Item')
        throw exceptions.Reservation.NoExistsUserOrItem;
      if (err.message === 'No Exist Item Quantity')
        throw exceptions.Reservation.NoExistsItemQuantity;

      throw exceptions.Reservation.TransactionError;
    } finally {
      await queryRunner.release();
    }
  }

  async createWait(reservation: createResevationDto): Promise<Reservation> {
    console.log('waiting ==================');
    const { user_id, item_id } = reservation;
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();

    await queryRunner.startTransaction('SERIALIZABLE');

    try {
      const [user, item] = await Promise.all([
        this.userRepository.findOne({ where: { id: user_id } }),
        queryRunner.manager.findOne(Item, {
          where: { id: item_id },
          lock: { mode: 'pessimistic_write' },
        }),
      ]);

      if (!user || !item) {
        throw new Error('No Exist User Or Item');
      }

      if (!item.quantity) {
        throw new Error('No Exist Item Quantity');
      }

      const updatedItem = await queryRunner.manager.update(Item, item.id, {
        quantity: item.quantity - 1,
      });

      await new Promise((resolve) => setTimeout(resolve, 10000));

      const createReservation = await queryRunner.manager.save(Reservation, {
        user: user,
        item: item,
      });

      await queryRunner.commitTransaction();

      return createReservation;
    } catch (err) {
      await queryRunner.rollbackTransaction();

      if (err.message === 'No Exist User Or Item')
        throw exceptions.Reservation.NoExistsUserOrItem;
      if (err.message === 'No Exist Item Quantity')
        throw exceptions.Reservation.NoExistsItemQuantity;

      throw exceptions.Reservation.TransactionError;
    } finally {
      await queryRunner.release();
    }
  }

  async remove(id: number): Promise<void> {
    await this.reservationRepository.delete(id);
  }
}

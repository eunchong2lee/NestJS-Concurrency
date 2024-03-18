import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Reservation } from './entities/reservation.entity';
import { UserRepository } from '../user/user.repository';
import { ItemRepository } from '../item/item.repository';
import exceptions from 'src/common/exceptions/exceptions';
import { Item } from '../item/entities/item.entity';

@Injectable()
export class ReservationRepository {
  constructor(
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>,
    private readonly userRepository: UserRepository,
    private readonly itemRepository: ItemRepository,

    @InjectDataSource() private readonly dataSource: DataSource,
  ) {}
  async save(options) {
    return await this.reservationRepository.save(options);
  }

  async find(options) {
    return await this.reservationRepository.find(options);
  }

  async findOne(options) {
    return await this.reservationRepository.findOne(options);
  }

  async update(id, options) {
    return await this.reservationRepository.update(id, options);
  }

  async delete(id) {
    return await this.reservationRepository.delete(id);
  }

  async query(options) {
    return await this.reservationRepository.query(options);
  }

  async createReservation(user_id, item_id) {
    console.log('just ==========');
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();

    await queryRunner.startTransaction('SERIALIZABLE');

    try {
      const [user, item] = await Promise.all([
        this.userRepository.findOne({ where: { id: user_id } }),
        this.itemRepository.findOne({ where: { id: item_id } }),
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

  async createWaitReservation(user_id, item_id) {
    console.log('waiting ==================');
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();

    await queryRunner.startTransaction('SERIALIZABLE');

    try {
      const [user, item] = await Promise.all([
        this.userRepository.findOne({ where: { id: user_id } }),
        this.itemRepository.findOne({ where: { id: item_id } }),
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
}

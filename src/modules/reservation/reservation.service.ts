import { Injectable } from '@nestjs/common';
import { Reservation } from './entities/reservation.entity';
import { ReservationRepository } from './reservation.repository';
import { createResevationDto } from './dto/createReservation.dto';
import { ItemRepository } from '../item/item.repository';
import { UserRepository } from '../user/user.repository';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, QueryRunner } from 'typeorm';
import { Item } from '../item/entities/item.entity';
import exceptions from '../../common/exceptions/exceptions';
import { Transactional } from 'typeorm-transactional-cls-hooked';

@Injectable()
export class ReservationService {
  constructor(
    private readonly reservationRepository: ReservationRepository,
    private readonly userRepository: UserRepository,
    private readonly itemRepository: ItemRepository,
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
    try {
      const createReservation = await this.reservationRepository.runTransaction(
        async (queryRunner) => {
          return await this.createReservation(queryRunner, reservation);
        },
      );

      return createReservation;
    } catch (err) {
      if (err.message === 'No Exist User Or Item')
        throw exceptions.Reservation.NoExistsUserOrItem;
      if (err.message === 'No Exist Item Quantity')
        throw exceptions.Reservation.NoExistsItemQuantity;

      throw exceptions.Reservation.TransactionError;
    }
  }

  async createReservation(
    queryRunner: QueryRunner,
    reservation: createResevationDto,
  ): Promise<Reservation> {
    const { user_id, item_id } = reservation;

    const [user, item] = await Promise.all([
      this.userRepository.queryRunnerFindOne(queryRunner, {
        where: { id: user_id },
      }),
      this.itemRepository.queryRunnerFindOne(queryRunner, {
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

    await this.itemRepository.queryRunnerUpdate(queryRunner, item.id, {
      quantity: item.quantity - 1,
    });

    const createReservation = await this.reservationRepository.queryRunnerSave(
      queryRunner,
      {
        user: user,
        item: item,
      },
    );

    return createReservation;
  }

  async remove(id: number): Promise<void> {
    await this.reservationRepository.delete(id);
  }
}

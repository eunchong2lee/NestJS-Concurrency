import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from './entities/reservation.entity';

@Injectable()
export class ReservationRepository {
  constructor(
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>,
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
    return;
  }

  async createWaitReservation(user_id, item_id) {
    return;
  }
}

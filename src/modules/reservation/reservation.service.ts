import { Injectable } from '@nestjs/common';
import { Reservation } from './entities/reservation.entity';
import { ReservationRepository } from './reservation.repository';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class ReservationService {
  constructor(
    private readonly reservationRepository: ReservationRepository,
    @InjectDataSource() private readonly dataSource: DataSource,
  ) {}

  async findAll(): Promise<Reservation[]> {
    let options;
    return await this.reservationRepository.find(options);
  }

  async findOne(id: number): Promise<Reservation> {
    return await this.reservationRepository.findOne(id);
  }

  async create(reservation: Reservation): Promise<Reservation> {
    try {
      return await this.reservationRepository.save(reservation);
    } catch (err) {}
  }

  async createWait(reservation: Reservation): Promise<Reservation> {
    try {
      const delayedTask = () => {
        console.log('10 seconds');
      };

      setTimeout(delayedTask, 10000);

      return await this.reservationRepository.save(reservation);
    } catch (err) {}
  }

  async remove(id: number): Promise<void> {
    await this.reservationRepository.delete(id);
  }
}

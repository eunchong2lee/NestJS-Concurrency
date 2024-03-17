import { Injectable } from '@nestjs/common';
import { Reservation } from './entities/reservation.entity';
import { ReservationRepository } from './reservation.repository';

@Injectable()
export class ReservationService {
  constructor(private readonly reservationRepository: ReservationRepository) {}

  async findAll(): Promise<Reservation[]> {
    let options;
    return await this.reservationRepository.find(options);
  }

  async findOne(id: number): Promise<Reservation> {
    return await this.reservationRepository.findOne(id);
  }

  async create(reservation: Reservation): Promise<Reservation> {
    return await this.reservationRepository.save(reservation);
  }

  async remove(id: number): Promise<void> {
    await this.reservationRepository.delete(id);
  }
}

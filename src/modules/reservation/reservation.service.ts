import { Injectable } from '@nestjs/common';
import { Reservation } from './entities/reservation.entity';
import { ReservationRepository } from './reservation.repository';
import { createResevationDto } from './dto/createReservation.dto';

@Injectable()
export class ReservationService {
  constructor(private readonly reservationRepository: ReservationRepository) {}

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

    return await this.reservationRepository.createReservation(user_id, item_id);
  }

  async createWait(reservation: createResevationDto): Promise<Reservation> {
    try {
      const { user_id, item_id } = reservation;

      return await this.reservationRepository.createWaitReservation(
        user_id,
        item_id,
      );
    } catch (err) {}
  }

  async remove(id: number): Promise<void> {
    await this.reservationRepository.delete(id);
  }
}

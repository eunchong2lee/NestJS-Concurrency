import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { Reservation } from './entities/reservation.entity';
import { ReservationService } from './reservation.service';

@Controller('reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Get()
  findAll(): Promise<Reservation[]> {
    return this.reservationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Reservation> {
    return this.reservationService.findOne(+id);
  }

  @Post()
  create(@Body() reservation: Reservation): Promise<Reservation> {
    return this.reservationService.create(reservation);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.reservationService.remove(+id);
  }
}

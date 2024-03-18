import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { Reservation } from './entities/reservation.entity';
import { ReservationService } from './reservation.service';

@Controller('reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Get()
  async findAll(): Promise<Reservation[]> {
    return await this.reservationService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Reservation> {
    return await this.reservationService.findOne(+id);
  }

  @Post()
  async create(@Body() reservation: Reservation): Promise<Reservation> {
    return await this.reservationService.create(reservation);
  }

  @Post()
  async createWait(@Body() reservation: Reservation): Promise<Reservation> {
    return await this.reservationService.createWait(reservation);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.reservationService.remove(id);
  }
}

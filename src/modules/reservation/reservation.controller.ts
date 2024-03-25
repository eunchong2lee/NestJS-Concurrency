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
import { createResevationDto } from './dto/createReservation.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('reservation')
@Controller('reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Get()
  @ApiOperation({
    summary: ' get All Reservations',
    description: 'get All Reservations',
  })
  @ApiOkResponse({ description: 'get All Reservations', type: [Reservation] })
  async findAll(): Promise<Reservation[]> {
    return await this.reservationService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get One Reservation',
    description: 'FindOne Reservation By reservation_id',
  })
  @ApiParam({
    name: 'id',
    description: 'reservation_id',
    example: 1,
    type: Number,
    required: true,
  })
  @ApiOkResponse({
    description: 'findOne Reservation by reservation_id',
    type: Reservation,
  })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Reservation> {
    return await this.reservationService.findOne(id);
  }

  @Post()
  @ApiOperation({
    summary: 'create reservation',
    description: 'create reservation',
  })
  @ApiBody({ type: createResevationDto })
  @ApiOkResponse({ description: 'complete created', type: Reservation })
  @ApiBadRequestResponse({ description: 'fail' })
  async create(@Body() reservation: createResevationDto): Promise<Reservation> {
    return await this.reservationService.create(reservation);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'delete reservation by id',
    description: 'delete reservation by id',
  })
  @ApiParam({
    name: 'id',
    description: 'reservation_id',
    example: 1,
    type: Number,
    required: true,
  })
  @ApiOkResponse({ description: 'complete deleted' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.reservationService.remove(id);
  }
}

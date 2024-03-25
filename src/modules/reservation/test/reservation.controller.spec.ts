import { Test, TestingModule } from '@nestjs/testing';
import { ReservationController } from '../reservation.controller';
import { ReservationService } from '../reservation.service';
import { ReservationRepository } from '../reservation.repository';
import { UserRepository } from '../../user/user.repository';
import { ItemRepository } from '../../item/item.repository';
import { Reservation } from '../entities/reservation.entity';
import { createResevationDto } from '../dto/createReservation.dto';
import { User } from '../../user/entities/user.entity';
import { Item } from '../../item/entities/item.entity';

export type reservation_type = {
  id: number;
  reservation_date: Date;
  user?: User; // 선택적으로 사용
  item?: Item; // 선택적으로 사용
};

describe('ReservationController', () => {
  let controller: ReservationController;
  let service: ReservationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReservationController],
      providers: [
        ReservationService,
        { provide: ReservationRepository, useValue: {} },
        { provide: UserRepository, useValue: {} },
        { provide: ItemRepository, useValue: {} },
      ],
    }).compile();

    controller = module.get<ReservationController>(ReservationController);
    service = module.get<ReservationService>(ReservationService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('return reservations', async () => {
      const reservations: Reservation[] = [
        {
          id: 1,
          reservation_date: new Date(),
        },
      ];
      jest.spyOn(service, 'findAll').mockResolvedValueOnce(reservations);

      expect(await controller.findAll()).toEqual(reservations);
    });
  });

  describe('findOne', () => {
    it('return findOne by reservation', async () => {
      const reservation: Reservation = {
        id: 1,
        reservation_date: new Date(),
      };
      jest.spyOn(service, 'findOne').mockResolvedValueOnce(reservation);

      expect(await controller.findOne(1)).toEqual(reservation);
    });
  });

  describe('create', () => {
    it('return create resrvation', async () => {
      const createReservationDto: createResevationDto = {
        user_id: 1,
        item_id: 1,
      };
      const result: Reservation = {
        id: 1,
        reservation_date: new Date(),
        user: {
          id: 1,
          username: 'test',
          reservations: [],
        },
        item: {
          id: 1,
          quantity: 3,
          name: 'test',
          reservations: [],
        },
      };
      jest.spyOn(service, 'create').mockResolvedValueOnce(result);

      expect(await controller.create(createReservationDto)).toEqual(result);
    });
  });

  describe('remove', () => {
    it('return remove', async () => {
      jest.spyOn(service, 'remove').mockResolvedValueOnce();

      expect(await controller.remove(1));
    });
  });
});

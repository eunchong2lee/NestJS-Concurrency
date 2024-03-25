import { Test, TestingModule } from '@nestjs/testing';
import { ReservationController } from '../reservation.controller';
import { ReservationService } from '../reservation.service';
import { ReservationRepository } from '../reservation.repository';
import { UserRepository } from '../../user/user.repository';
import { ItemRepository } from '../../item/item.repository';

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
});

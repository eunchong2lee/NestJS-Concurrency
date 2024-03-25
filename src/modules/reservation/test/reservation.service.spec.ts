import { Test, TestingModule } from '@nestjs/testing';
import { ReservationService } from '../reservation.service';
import { ReservationRepository } from '../reservation.repository';
import { UserRepository } from '../../user/user.repository';
import { ItemRepository } from '../../item/item.repository';

describe('ReservationService', () => {
  let service: ReservationService;
  let repository: ReservationRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReservationService,
        { provide: ReservationRepository, useValue: {} },
        { provide: UserRepository, useValue: {} },
        { provide: ItemRepository, useValue: {} },
      ],
    }).compile();

    service = module.get<ReservationService>(ReservationService);
    repository = module.get<ReservationRepository>(ReservationRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

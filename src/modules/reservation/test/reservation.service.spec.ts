import { Test, TestingModule } from '@nestjs/testing';
import { ReservationService } from '../reservation.service';
import { ReservationRepository } from '../reservation.repository';
import { UserRepository } from '../../user/user.repository';
import { ItemRepository } from '../../item/item.repository';
import { Reservation } from '../entities/reservation.entity';

describe('ReservationService', () => {
  let service: ReservationService;
  let repository: ReservationRepository;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReservationService,
        {
          provide: ReservationRepository,
          useValue: {
            find: jest.fn(),
            runTransaction: jest.fn(),
            queryRunnerFindOne: jest.fn(),
          },
        },
        {
          provide: UserRepository,
          useValue: { queryRunnerFindOne: jest.fn() },
        },
        { provide: ItemRepository, useValue: {} },
      ],
    }).compile();

    service = module.get<ReservationService>(ReservationService);
    repository = module.get<ReservationRepository>(ReservationRepository);
    userRepository = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('return all reservations', async () => {
      const reservations: Reservation[] = [
        { id: 1, reservation_date: new Date(), user: null, item: null },
        { id: 2, reservation_date: new Date(), user: null, item: null },
      ];

      jest.spyOn(repository, 'find').mockResolvedValue(reservations);

      const result = await service.findAll();

      expect(result).toEqual(reservations);
    });
  });
});

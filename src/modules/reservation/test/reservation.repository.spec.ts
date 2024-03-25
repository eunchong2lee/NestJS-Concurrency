import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { ReservationRepository } from '../reservation.repository';
import { Reservation } from '../entities/reservation.entity';

describe('ReservationRepository', () => {
  let repository: ReservationRepository;
  let mockRepository: Repository<Reservation>;
  const dataSource = {
    createEntityManager: jest.fn(),
    createQueryRunner: jest.fn().mockReturnValue({
      connect: jest.fn(),
      manager: {
        update: jest.fn(),
      },
      startTransaction: jest.fn(),
      commitTransaction: jest.fn(),
      rollbackTransaction: jest.fn(),
      release: jest.fn(),
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReservationRepository,
        {
          provide: getRepositoryToken(Reservation),
          useClass: Repository,
        },
        { provide: DataSource, useValue: dataSource },
      ],
    }).compile();

    repository = module.get<ReservationRepository>(ReservationRepository);
    mockRepository = module.get<Repository<Reservation>>(
      getRepositoryToken(Reservation),
    );
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });
});

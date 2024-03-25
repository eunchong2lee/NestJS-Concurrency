import { Test, TestingModule } from '@nestjs/testing';
import { TransactionService } from '../transaction.service';
import { Repository } from 'typeorm';
import { Mock } from '../../mock/entities/mock.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MockRepository } from '../../mock/mock.repository';

describe('TransactionService', () => {
  let service: TransactionService;
  let mockRepository: MockRepository;
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
        TransactionService,
        {
          provide: MockRepository,
          useValue: {
            dataSource,
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TransactionService>(TransactionService);
    mockRepository = module.get<MockRepository>(MockRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

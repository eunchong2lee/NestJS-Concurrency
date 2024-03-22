import { Test, TestingModule } from '@nestjs/testing';
import { MockRepository } from '../mock.repository';
import { MockService } from '../mock.service';
import { Mock } from '../entities/mock.entity';
import { createMockDto } from '../dto/createMock.dto';

describe('MockService', () => {
  let service: MockService;
  let repository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MockService,
        {
          provide: MockRepository,
          useValue: {
            find: jest.fn(),
            save: jest.fn(),
            delete: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<MockService>(MockService);
    repository = module.get<MockRepository>(MockRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('return all mocks', async () => {
      const mocks: Mock[] = [
        {
          id: 1,
          value: 20,
        },
        {
          id: 2,
          value: 200,
        },
        {
          id: 3,
          value: 20,
        },
        {
          id: 4,
          value: 20,
        },
      ];
      jest.spyOn(repository, 'find').mockResolvedValue(mocks);

      const result = await service.findAll();

      expect(result).toEqual(mocks);
    });
  });

  describe('initialize', () => {
    it('return initialize', async () => {
      const mocks: Mock[] = [
        {
          id: 1,
          value: 20,
        },
        {
          id: 2,
          value: 200,
        },
        {
          id: 3,
          value: 20,
        },
        {
          id: 4,
          value: 20,
        },
      ];
      jest.spyOn(repository, 'update').mockResolvedValue({} as any);
      jest.spyOn(repository, 'find').mockResolvedValue(mocks);

      const result = await service.initialize();

      expect(result).toEqual('complete');
    });
  });

  describe('create', () => {
    it('return create mock', async () => {
      const createMockDto: createMockDto = { value: 20 };
      const result_mock: Mock = {
        id: 1,
        value: 20,
      };
      jest.spyOn(repository, 'save').mockResolvedValue(result_mock);

      const result = await service.create(createMockDto);

      expect(result).toEqual(result_mock);
    });
  });

  describe('remove', () => {
    it('return remove', async () => {
      const mock_id = 1;
      jest.spyOn(repository, 'delete').mockResolvedValue([] as any);

      const result = await service.remove(mock_id);

      expect(result).toEqual('complete');
    });
  });
});

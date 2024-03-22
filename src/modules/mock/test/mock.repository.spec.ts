import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { MockRepository } from '../mock.repository';
import { Mock } from '../entities/mock.entity';
import { createMockDto } from '../dto/createMock.dto';

describe('MockRepository', () => {
  let repository: MockRepository;
  let mockRepository: Repository<Mock>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MockRepository,
        {
          provide: getRepositoryToken(Mock),
          useClass: Repository,
        },
        {
          provide: DataSource,
          useClass: DataSource,
        },
      ],
    }).compile();

    repository = module.get<MockRepository>(MockRepository);
    mockRepository = module.get<Repository<Mock>>(getRepositoryToken(Mock));
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('save', () => {
    it('should save a mock', async () => {
      const createMockDto: createMockDto = { value: 20 };
      const mock = { id: 1, value: 20 };
      jest.spyOn(mockRepository, 'save').mockResolvedValue(mock);

      const result = await repository.save(createMockDto);

      expect(result).toEqual(mock);
    });
  });

  describe('find', () => {
    it('should find mocks', async () => {
      const options = { where: { value: 20 } };
      const mocks: Mock[] = [
        {
          id: 1,
          value: 20,
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
      jest.spyOn(mockRepository, 'find').mockResolvedValue(mocks);

      const result = await repository.find(options);

      expect(result).toEqual(mocks);
    });
  });

  describe('findOne', () => {
    it('should findOne mock', async () => {
      const options = { where: { id: 1 } };
      const mock = { id: 1, value: 20 };
      jest.spyOn(mockRepository, 'findOne').mockResolvedValue(mock);

      const result = await repository.findOne(options);

      expect(result).toEqual(mock);
    });
  });

  describe('delete', () => {
    it('should delete a mock', async () => {
      const mock = { id: 1, value: 20 };
      jest.spyOn(mockRepository, 'delete').mockResolvedValue({} as any);

      const result = await repository.delete(1);

      expect(result).toEqual(mock);
    });
  });
});

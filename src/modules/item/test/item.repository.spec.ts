import { Test, TestingModule } from '@nestjs/testing';

import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from '../entities/item.entity';
import { ItemRepository } from '../item.repository';

describe('ItemRepository', () => {
  let repository: ItemRepository;
  let mockRepository: Repository<Item>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ItemRepository,
        {
          provide: getRepositoryToken(Item),
          useClass: Repository,
        },
      ],
    }).compile();

    repository = module.get<ItemRepository>(ItemRepository);
    mockRepository = module.get<Repository<Item>>(getRepositoryToken(Item));
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('save', () => {
    it('should save a item', async () => {
      const item: Item = {
        id: 1,
        name: 'test',
        quantity: 3,
        reservations: [],
      };
      jest.spyOn(mockRepository, 'save').mockResolvedValue(item);

      const result = await repository.save(item);

      expect(result).toEqual(item);
    });
  });

  describe('find', () => {
    it('should find items', async () => {
      const options = { where: { name: 'test' } };
      const items: Item[] = [
        {
          id: 1,
          name: 'test',
          quantity: 3,
          reservations: [],
        },
      ];
      jest.spyOn(mockRepository, 'find').mockResolvedValue(items);

      const result = await repository.find(options);

      expect(result).toEqual(items);
    });
  });

  describe('findone', () => {
    it('should findone item', async () => {
      const options = { where: { id: 1 } };
      const item: Item = {
        id: 1,
        name: 'test',
        quantity: 3,
        reservations: [],
      };
      jest.spyOn(mockRepository, 'findOne').mockResolvedValue(item);

      const result = await repository.findOne(options);

      expect(result).toEqual(item);
    });
  });

  describe('remove', () => {
    it('should remove a item', async () => {
      const item = {
        id: 1,
        name: 'test',
        quantity: 3,
        reservations: [],
      };
      jest.spyOn(mockRepository, 'remove').mockResolvedValue(item);

      const result = await repository.remove(item);

      expect(result).toEqual(item);
    });
  });
});

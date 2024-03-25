import { Test, TestingModule } from '@nestjs/testing';
import { ItemController } from '../item.controller';
import { ItemService } from '../item.service';
import { ItemRepository } from '../item.repository';
import { Item } from '../entities/item.entity';
import { createItemDto } from '../dto/createItem.dto';

describe('ItemController', () => {
  let controller: ItemController;
  let service: ItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemController],
      providers: [
        {
          provide: ItemService,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            remove: jest.fn(),
          },
        },

        { provide: ItemRepository, useValue: jest.fn() },
      ],
    }).compile();

    controller = module.get<ItemController>(ItemController);
    service = module.get<ItemService>(ItemService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('return ALL Items', async () => {
      const items: Item[] = [
        {
          id: 1,
          name: 'test',
          quantity: 3,
          reservations: [],
        },
      ];
      jest.spyOn(service, 'findAll').mockImplementation(async () => items);
      expect(await controller.findAll()).toEqual(items);
    });
  });

  describe('findOne', () => {
    it('return FindByID Item', async () => {
      const result: Item = {
        id: 1,
        name: 'test',
        quantity: 3,
        reservations: [],
      };
      jest.spyOn(service, 'findOne').mockImplementation(async () => result);
      expect(await controller.findOne(1)).toEqual(result);
    });
  });

  describe('create', () => {
    it('return createItem', async () => {
      const createItemDto: createItemDto = { name: 'test', quantity: 3 };
      const result: Item = {
        id: 1,
        name: 'test',
        quantity: 3,
        reservations: [],
      };
      jest.spyOn(service, 'create').mockImplementation(async () => result);
      expect(await controller.create(createItemDto)).toEqual(result);
    });
  });

  describe('remove', () => {
    it('return delete Item', async () => {
      const removedItem: Item = {
        id: 1,
        name: 'test',
        quantity: 3,
        reservations: [],
      };
      jest.spyOn(service, 'remove').mockImplementation(async () => removedItem);
      expect(await controller.remove(1)).toEqual(removedItem);
    });
  });
});

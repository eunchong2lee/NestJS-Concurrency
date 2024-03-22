import { Test, TestingModule } from '@nestjs/testing';
import { ItemService } from '../item.service';
import { ItemRepository } from '../item.repository';
import { createItemDto } from '../dto/createItem.dto';
import { Item } from '../entities/item.entity';

describe('ItemService', () => {
  let service: ItemService;
  let repository: ItemRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ItemService,
        {
          provide: ItemRepository,
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            save: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ItemService>(ItemService);
    repository = module.get<ItemRepository>(ItemRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('return all items', async () => {
      const items: Item[] = [
        {
          id: 1,
          name: 'test',
          quantity: 3,
          reservations: [],
        },
      ];
      jest.spyOn(repository, 'find').mockResolvedValue(items);
      // spyOn Jest에서 제공하는 함수로 특정 객체의 메서드를 mock하거나 감시하는데 사용
      // mockResolvedValue() promise 반환하는 값을 설정하고, 해당 값이 Promise로 reslove될 때를 대비해 사용

      const result = await service.findAll();

      expect(await service.findAll()).toEqual(result);
    });
  });

  describe('findOne', () => {
    it('return item', async () => {
      const item: Item = {
        id: 1,
        name: 'test',
        quantity: 3,
        reservations: [],
      };
      jest.spyOn(repository, 'findOne').mockResolvedValue(item);

      const result = await service.findOne(item.id);

      expect(await service.findOne(item.id)).toEqual(result);
    });
  });

  describe('create', () => {
    it('return create item', async () => {
      const createItemDto: createItemDto = { name: 'test', quantity: 3 };
      const result_item: Item = {
        id: 1,
        name: 'test',
        quantity: 3,
        reservations: [],
      };
      jest.spyOn(repository, 'save').mockResolvedValue(result_item);
      // spyOn Jest에서 제공하는 함수로 특정 객체의 메서드를 mock하거나 감시하는데 사용
      // mockResolvedValue() promise 반환하는 값을 설정하고, 해당 값이 Promise로 reslove될 때를 대비해 사용

      const result = await service.create(createItemDto);

      expect(await service.create(createItemDto)).toEqual(result);
    });
  });

  describe('remove', () => {
    it('return remove', async () => {
      const find_item = {
        id: 1,
        name: 'test',
        quantity: 3,
        reservations: [],
      };
      const item_id = 1;
      jest.spyOn(repository, 'findOne').mockResolvedValue(find_item);
      jest.spyOn(repository, 'remove').mockResolvedValue(find_item);
      // spyOn Jest에서 제공하는 함수로 특정 객체의 메서드를 mock하거나 감시하는데 사용
      // mockResolvedValue() promise 반환하는 값을 설정하고, 해당 값이 Promise로 reslove될 때를 대비해 사용

      const result = await service.remove(item_id);

      expect(await service.remove(item_id)).toEqual(result);
    });
  });
});

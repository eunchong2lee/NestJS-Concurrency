import { Test, TestingModule } from '@nestjs/testing';
import { MockController } from '../mock.controller';
import { MockService } from '../mock.service';
import { MockRepository } from '../mock.repository';
import { Mock } from '../entities/mock.entity';
import { createMockDto } from '../dto/createMock.dto';

describe('MockController', () => {
  let controller: MockController;
  let service: MockService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MockController],
      providers: [
        MockService,
        { provide: MockRepository, useValue: jest.fn() },
      ],
    }).compile();

    controller = module.get<MockController>(MockController);
    service = module.get<MockService>(MockService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('return ALL mocks', async () => {
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
      jest.spyOn(service, 'findAll').mockImplementation(async () => mocks);
      expect(await controller.findAll()).toEqual(mocks);
    });
  });

  describe('initialize', () => {
    it('initialize', async () => {
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
      jest
        .spyOn(service, 'initialize')
        .mockImplementation(async () => 'complete');
      expect(await controller.initialize()).toEqual('complete');
    });
  });

  describe('create', () => {
    it('return creatMock', async () => {
      const createMockDto: createMockDto = { value: 20 };
      const result: Mock = {
        id: 1,
        value: 20,
      };
      jest.spyOn(service, 'create').mockImplementation(async () => result);
      expect(await controller.create(createMockDto)).toEqual(result);
    });
  });

  describe('remove', () => {
    it('return delete Mock', async () => {
      jest.spyOn(service, 'remove').mockImplementation(async () => 'complete');
      expect(await controller.remove(1)).toEqual('complete');
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { TransactionController } from '../transaction.controller';
import { TransactionService } from '../transaction.service';
import { Mock } from '../../mock/entities/mock.entity';
import { MockRepository } from '../../mock/mock.repository';

describe('TransactionController', () => {
  let controller: TransactionController;
  let service: TransactionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionController],
      providers: [
        TransactionService,
        { provide: MockRepository, useValue: {} },
      ],
    }).compile();

    controller = module.get<TransactionController>(TransactionController);
    service = module.get<TransactionService>(TransactionService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('phenomena/dirty-read', () => {
    it('dirty-read', async () => {
      const result: { first_data: Mock; second_data: Mock } = {
        first_data: {
          id: 1,
          value: 320,
        },
        second_data: {
          id: 2,
          value: 200,
        },
      };
      jest.spyOn(service, 'dirtyReadTest').mockResolvedValueOnce(result);

      expect(await controller.dirtyRead()).toEqual(result);
    });
  });

  describe('phenomena/non-repeatable-read', () => {
    it('non-repeatable-read', async () => {
      const result: { first_find_mock: Mock; second_find_mock: Mock } = {
        first_find_mock: {
          id: 1,
          value: 20,
        },
        second_find_mock: {
          id: 1,
          value: 50,
        },
      };
      jest
        .spyOn(service, 'nonRepeatableReadTest')
        .mockResolvedValueOnce(result);

      expect(await controller.nonRepeatableRead()).toEqual(result);
    });
  });

  describe('phenomena/phantom-read', () => {
    it('phantom-read', async () => {
      const result: { first_find_data: Mock[]; second_find_data: Mock[] } = {
        first_find_data: [
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
        ],
        second_find_data: [
          {
            id: 1,
            value: 20,
          },
          {
            id: 2,
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
        ],
      };
      jest.spyOn(service, 'phantomReadTest').mockResolvedValueOnce(result);

      expect(await controller.phantomRead()).toEqual(result);
    });
  });

  describe('isolation-level/read-uncommitted', () => {
    it('isolation-level/read-uncommitted', async () => {
      const result: { first_data: Mock; second_data: Mock } = {
        first_data: {
          id: 1,
          value: 320,
        },
        second_data: {
          id: 2,
          value: 200,
        },
      };
      jest.spyOn(service, 'readUncomitted').mockResolvedValueOnce(result);

      expect(await controller.readUncomitted()).toEqual(result);
    });
  });

  describe('isolation-level/read-uncommitted', () => {
    it('isolation-level/read-uncommitted', async () => {
      const result: { first_data: Mock; second_data: Mock } = {
        first_data: {
          id: 1,
          value: 220,
        },
        second_data: {
          id: 2,
          value: 200,
        },
      };
      jest.spyOn(service, 'readComitted').mockResolvedValueOnce(result);

      expect(await controller.readComitted()).toEqual(result);
    });
  });

  describe('isolation-level/repeatable-read', () => {
    it('isolation-level/repeatable-read', async () => {
      const result: { first_find_mock: Mock; second_find_mock: Mock } = {
        first_find_mock: {
          id: 1,
          value: 20,
        },
        second_find_mock: {
          id: 1,
          value: 20,
        },
      };
      jest.spyOn(service, 'repeatableRead').mockResolvedValueOnce(result);

      expect(await controller.repeatableRead()).toEqual(result);
    });
  });

  describe('isolation-level/serializable', () => {
    it('isolation-level/serializable', async () => {
      const result: { first_find_data: Mock[]; second_find_data: Mock[] } = {
        first_find_data: [
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
        ],
        second_find_data: [
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
        ],
      };
      jest.spyOn(service, 'serializable').mockResolvedValueOnce(result);

      expect(await controller.serializable()).toEqual(result);
    });
  });
});

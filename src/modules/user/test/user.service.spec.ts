import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { UserRepository } from '../user.repository';
import { User } from '../entities/user.entity';
import { createUserDto } from '../dto/createUser.dto';

describe('UserService', () => {
  let service: UserService;
  let repository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepository,
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            save: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('return all users', async () => {
      const users: User[] = [{ id: 1, username: 'test', reservations: [] }];
      jest.spyOn(repository, 'find').mockResolvedValue(users);
      // spyOn Jest에서 제공하는 함수로 특정 객체의 메서드를 mock하거나 감시하는데 사용
      // mockResolvedValue() promise 반환하는 값을 설정하고, 해당 값이 Promise로 reslove될 때를 대비해 사용

      const result = await service.findAll();

      expect(await service.findAll()).toEqual(result);
    });
  });

  describe('findOne', () => {
    it('return user', async () => {
      const user: User = { id: 1, username: 'test', reservations: [] };
      jest.spyOn(repository, 'findOne').mockResolvedValue(user);

      const result = await service.findOne(user.id);

      expect(await service.findOne(user.id)).toEqual(result);
    });
  });

  describe('create', () => {
    it('return create user', async () => {
      const createUserDto: createUserDto = { username: 'test' };
      const result_user: User = { id: 1, username: 'test', reservations: [] };
      jest.spyOn(repository, 'save').mockResolvedValue(result_user);
      // spyOn Jest에서 제공하는 함수로 특정 객체의 메서드를 mock하거나 감시하는데 사용
      // mockResolvedValue() promise 반환하는 값을 설정하고, 해당 값이 Promise로 reslove될 때를 대비해 사용

      const result = await service.create(createUserDto);

      expect(await service.create(createUserDto)).toEqual(result);
    });
  });

  describe('remove', () => {
    it('return remove', async () => {
      const find_user = { id: 1, username: 'test', reservations: [] };
      const user_id = 1;
      jest.spyOn(repository, 'findOne').mockResolvedValue(find_user);
      jest.spyOn(repository, 'remove').mockResolvedValue(find_user);
      // spyOn Jest에서 제공하는 함수로 특정 객체의 메서드를 mock하거나 감시하는데 사용
      // mockResolvedValue() promise 반환하는 값을 설정하고, 해당 값이 Promise로 reslove될 때를 대비해 사용

      const result = await service.remove(user_id);

      expect(await service.remove(user_id)).toEqual(result);
    });
  });
});

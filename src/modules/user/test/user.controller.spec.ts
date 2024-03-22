import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';
import { User } from '../entities/user.entity';
import { createUserDto } from '../dto/createUser.dto';
import { UserRepository } from '../user.repository';
describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        { provide: UserRepository, useValue: jest.fn() },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('return ALL Users', async () => {
      const user: User[] = [
        {
          id: 1,
          username: 'john',
          reservations: [],
        },
      ];
      jest.spyOn(service, 'findAll').mockImplementation(async () => user);
      expect(await controller.findAll()).toEqual(user);
    });
  });

  describe('findOne', () => {
    it('return FindByID User', async () => {
      const result: User = { id: 1, username: 'John', reservations: [] };
      jest.spyOn(service, 'findOne').mockImplementation(async () => result);
      expect(await controller.findOne(1)).toEqual(result);
    });
  });

  describe('create', () => {
    it('return createUser', async () => {
      const createUserDto: createUserDto = { username: 'John' };
      const result: User = { id: 1, username: 'John', reservations: [] };
      jest.spyOn(service, 'create').mockImplementation(async () => result);
      expect(await controller.create(createUserDto)).toEqual(result);
    });
  });

  describe('remove', () => {
    it('return delete User', async () => {
      const removedUser: User = { id: 1, username: 'test', reservations: [] };
      jest.spyOn(service, 'remove').mockImplementation(async () => removedUser);
      expect(await controller.remove(1)).toEqual(removedUser);
    });
  });
});

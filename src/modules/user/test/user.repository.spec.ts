import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from '../user.repository';
import { User } from '../entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('UserRepository', () => {
  let repository: UserRepository;
  let mockRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRepository,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    repository = module.get<UserRepository>(UserRepository);
    mockRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('save', () => {
    it('should save a user', async () => {
      const user = { id: 1, username: 'test', reservations: [] };
      jest.spyOn(mockRepository, 'save').mockResolvedValue(user);

      const result = await repository.save(user);

      expect(result).toEqual(user);
    });
  });

  describe('find', () => {
    it('should find users', async () => {
      const options = { where: { usernaem: 'test' } };
      const users = [{ id: 1, username: 'test', reservations: [] }];
      jest.spyOn(mockRepository, 'find').mockResolvedValue(users);

      const result = await repository.find(options);

      expect(result).toEqual(users);
    });
  });

  describe('findOne', () => {
    it('should findOne user', async () => {
      const options = { where: { id: 1 } };
      const user = { id: 1, username: 'test', reservations: [] };
      jest.spyOn(mockRepository, 'findOne').mockResolvedValue(user);

      const result = await repository.findOne(options);

      expect(result).toEqual(user);
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      const user = { id: 1, username: 'test', reservations: [] };
      jest.spyOn(mockRepository, 'remove').mockResolvedValue(user);

      const result = await repository.remove(user);

      expect(result).toEqual(user);
    });
  });
});

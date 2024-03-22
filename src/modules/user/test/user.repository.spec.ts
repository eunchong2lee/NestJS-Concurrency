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
      const saveSpy = jest
        .spyOn(mockRepository, 'save')
        .mockResolvedValue(user);

      const result = await repository.save(user);

      expect(saveSpy).toHaveBeenCalledWith(user);
      expect(result).toEqual(user);
    });
  });

  // 다른 메서드에 대한 유사한 테스트 작성
});

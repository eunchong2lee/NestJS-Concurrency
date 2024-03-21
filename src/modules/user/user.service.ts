import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';
import { createUserDto } from './dto/createUser.dto';
import exceptions from '../../common/exceptions/exceptions';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find('');
  }

  async findOne(id: number): Promise<User> {
    return await this.userRepository.findOne({
      where: { id },
    });
  }

  async create(user: createUserDto): Promise<User> {
    try {
      return await this.userRepository.save(user);
    } catch (err) {
      throw exceptions.User.InvalidUser;
    }
  }

  async remove(id: number) {
    try {
      const user = await this.findOne(id);
      if (!user) throw exceptions.User.NoExistsUser;

      return await this.userRepository.remove(user);
    } catch (err) {
      throw new BadRequestException('Bad Request');
    }
  }
}

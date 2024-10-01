import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }

  async findAll(isActive: boolean | undefined) {
    if (isActive !== undefined) {
      return this.usersRepository.find({ where: { isActive } });
    }

    return this.usersRepository.find();
  }

  async findOne(id: string) {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('O usuário não foi encontrado.');
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('O usuário não foi encontrado.');
    }

    Object.assign(user, updateUserDto);
    return await this.usersRepository.save(user);
  }

  async delete(id: string) {
    const user = await this.findOne(id);

    if (!user.isActive) {
      throw new BadRequestException('O usuário já está inativo.');
    }

    user.isActive = false;
    this.usersRepository.save(user);
    return user;
  }
}

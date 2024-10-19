import { Repository } from 'typeorm';
import { UsersService } from '../users.service';
import { User } from '../entity/users.entity';
import { TestingModule, Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { UsersRepositoryMock } from './mocks/users-repository.mock';
import { mockUser } from './mocks/user.mock';
import { UpdateUserDto } from '../dtos/update-user.dto';

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, UsersRepositoryMock],
    }).compile();

    service = module.get(UsersService);
    repository = module.get(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    const createDto: CreateUserDto = {
      email: 'jessie123@email.com',
      password: '123456',
    };
    const hashedPassword = await bcrypt.hash(createDto.password, 10);
    const mockedResultUser = {
      ...createDto,
      password: hashedPassword,
      id: uuidv4(),
    };

    repository.create = jest.fn().mockReturnValue(mockedResultUser);
    repository.save = jest.fn().mockResolvedValue(mockedResultUser);

    const result = await service.create(createDto);

    expect(repository.create).toHaveBeenCalledWith(createDto);
    expect(result).toEqual(mockedResultUser);
  });

  it('should return all users from database', async () => {
    const users = [mockUser];

    const result = await service.findAll(undefined);

    expect(repository.find).toHaveBeenCalled();
    expect(result).toEqual(users);
  });

  it('should find an user with the given id', async () => {
    const userId = mockUser.id;

    const result = await service.findOne(userId);

    expect(result).toEqual(mockUser);
  });

  it('should update an user', async () => {
    const updateUserDto: UpdateUserDto = { email: 'teste@test.com' };
    const updatedUser = { ...mockUser, ...updateUserDto };

    repository.findOneBy = jest.fn().mockResolvedValue(mockUser);
    repository.save = jest.fn().mockResolvedValue(updatedUser);

    const result = await service.update(mockUser.id, updateUserDto);

    expect(repository.save).toHaveBeenCalledWith(updatedUser);
    expect(result).toEqual(updatedUser);
  });

  it('should change the isActive attribute to false', async () => {
    const userId = mockUser.id;

    const result = await service.delete(userId);

    expect(result.isActive).toBe(false);
  });

  it('should return an user with the given email', async () => {
    const email = mockUser.email;

    const result = await service.findByEmail(email);

    expect(result).toEqual(mockUser);
  });

  it('should return the logged user', async () => {
    const id = mockUser.id;
    const userWithRelations = {
      ...mockUser,
      id,
      address: {
        id: '421caff0-8219-4acd-b5ad-0b6eb812104e',
        street: 'Rua três',
        city: 'Rio Alegrin',
        zipCode: '23456432',
        createdAt: '2024-10-04 01:10:11.457326',
      },
      pets: [
        {
          id: 'a3b0ace1-f9de-4286-bee8-f2a6eaef4267',
          name: 'Bartman',
          age: 3,
          breed: 'raça1',
          createdAt: '2024-10-09 01:14:32.078854',
          user_id: 'f6eb31be-0925-4115-9a6b-3b3c5253ce8f',
        },
      ],
      events: [
        {
          id: 1,
          eventName: 'Super Minas 2024',
          eventDate: '2024-10-11 20:00:00',
        },
      ],
    };

    repository.findOne = jest.fn().mockResolvedValue(userWithRelations);

    const result = await service.findProfile(id);

    expect(result).toEqual(userWithRelations);
  });
});

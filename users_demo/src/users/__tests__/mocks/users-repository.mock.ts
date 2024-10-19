import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../entity/users.entity';
import { mockUser } from './user.mock';

export const UsersRepositoryMock = {
  provide: getRepositoryToken(User),
  useValue: {
    create: jest.fn().mockReturnValue(mockUser),
    save: jest.fn().mockResolvedValue(mockUser),
    findOne: jest.fn().mockResolvedValue(mockUser),
    find: jest.fn().mockResolvedValue([mockUser]),
  },
};

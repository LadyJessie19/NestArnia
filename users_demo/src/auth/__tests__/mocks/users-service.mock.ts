import { mockUser } from './user.mock';

export const UsersServiceMock = {
  findByEmail: jest.fn().mockResolvedValue(mockUser),
};

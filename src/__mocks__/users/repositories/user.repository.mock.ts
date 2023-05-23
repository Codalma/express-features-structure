import { IUserRepository } from '@users/interfaces';

export const userRepositoryMock: IUserRepository = {
  create: jest.fn(),
};

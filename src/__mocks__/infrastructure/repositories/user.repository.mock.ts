import { IUserRepository } from '@domain/repositories';

export const userRepositoryMock: IUserRepository = {
  create: jest.fn(),
};

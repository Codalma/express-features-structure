import { IUser } from '@domain/interfaces';

export interface IUserRepository {
  create(user: IUser): void;
}

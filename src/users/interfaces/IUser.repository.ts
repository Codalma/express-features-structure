import { IUser } from '@users/interfaces';

export interface IUserRepository {
  create(user: IUser): void;
}

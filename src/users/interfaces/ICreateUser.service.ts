import { UserMapper } from '@users/mappers';

export interface ICreateUserService {
  execute(user: UserMapper): void;
}

import { UserMapper } from '@application/mappers';

export interface ICreateUserUseCase {
  execute(user: UserMapper): void;
}

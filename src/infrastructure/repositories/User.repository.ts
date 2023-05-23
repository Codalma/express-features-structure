import { IUserRepository } from '@domain/repositories';
import { IUser } from '@domain/interfaces';

export class UserRepository implements IUserRepository {
  public async create(user: IUser) {
    console.log('Infra - user repository: user created.', user);
  }
}

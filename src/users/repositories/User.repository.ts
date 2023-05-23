import { IUserRepository, IUser } from '@users/interfaces';

export class UserRepository implements IUserRepository {
  public async create(user: IUser) {
    console.log('Infra - user repository: user created.', user);
  }
}

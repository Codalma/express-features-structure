import { BaseModel } from '@common/models';
import { UserNameModel } from '@users/models/';
import { IUser } from '@users/interfaces';

export interface IUserProps {
  uuid: string;
  name: string;
}

export class UserModel extends BaseModel implements IUser {
  name: string;
  private constructor(userProps: IUserProps) {
    super(userProps.uuid);
    this.name = UserNameModel.create(userProps.name);
  }

  static create(userProps: IUserProps) {
    return new UserModel(userProps);
  }
}

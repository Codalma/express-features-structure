import { BaseEntity } from '@domain/entities/';
import { UserNameVo } from '@domain/value-objects';
import { IUser } from '@domain/interfaces';

export interface IUserProps {
  uuid: string;
  name: string;
}

export class UserEntity extends BaseEntity implements IUser {
  name: string;
  private constructor(userProps: IUserProps) {
    super(userProps.uuid);
    this.name = UserNameVo.create(userProps.name);
  }

  static create(userProps: IUserProps) {
    return new UserEntity(userProps);
  }
}

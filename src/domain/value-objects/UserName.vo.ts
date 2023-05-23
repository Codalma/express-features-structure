import { DomainError } from '@domain/exceptions';

export class UserNameVo {
  private value: string;

  private constructor(name: string) {
    this.value = name;
  }

  static create(name: string) {
    if (!name) {
      throw DomainError.badRequest('You must provide a valid user name.');
    } else if (name.length < 2 || name.length >= 20) {
      throw DomainError.badRequest(
        'You must provide a name between 2 and 20 characters long.'
      );
    } else {
      return new UserNameVo(name).value;
    }
  }
}

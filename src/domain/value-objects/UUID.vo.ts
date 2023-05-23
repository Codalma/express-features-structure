import { DomainError } from '@domain/exceptions';

export class UUIDVo {
  private value: string;

  private constructor(uuid: string) {
    this.value = uuid;
  }

  static create(uuid: string) {
    const v4RegExp =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[4][0-9a-fA-F]{3}-[89AB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/i;

    const isUUIDValid = v4RegExp.test(uuid);

    if (!isUUIDValid) {
      throw DomainError.badRequest('You must provide a valid UUID.');
    } else {
      return new UUIDVo(uuid).value;
    }
  }
}

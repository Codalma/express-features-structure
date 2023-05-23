import { AppError } from '@common/exceptions';

export class UUIDModel {
  private value: string;

  private constructor(uuid: string) {
    this.value = uuid;
  }

  static create(uuid: string) {
    const v4RegExp =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[4][0-9a-fA-F]{3}-[89AB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/i;

    const isUUIDValid = v4RegExp.test(uuid);

    if (!isUUIDValid) {
      throw AppError.badRequest('You must provide a valid UUID.');
    } else {
      return new UUIDModel(uuid).value;
    }
  }
}

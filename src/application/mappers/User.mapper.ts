import { ICreateUserDto } from '@application/interfaces';

export class UserMapper {
  static toDTO(inputs: ICreateUserDto) {
    const userDTO = {
      name: inputs.name,
    };

    return userDTO;
  }
}

import { IUserProps, UserEntity } from '@domain/entities';
import { IUser } from '@domain/interfaces';
import { IUUIDService } from '@domain/services/';

import { ICreateUserUseCase, ICreateUserDto } from '@application/interfaces';

import { IUserRepository } from '@domain/repositories/IUser.repository';

export class CreateUserUseCase implements ICreateUserUseCase {
  private uuidService: IUUIDService;
  private userRepository: IUserRepository;

  constructor(uuidProvider: IUUIDService, userRepository: IUserRepository) {
    this.uuidService = uuidProvider;
    this.userRepository = userRepository;
  }

  public execute(userDTO: ICreateUserDto) {
    const userUUID = this.uuidService.generate();

    const userProps: IUserProps = {
      uuid: userUUID,
      name: userDTO.name,
    };

    const user: IUser = UserEntity.create(userProps);

    this.userRepository.create(user);
  }
}

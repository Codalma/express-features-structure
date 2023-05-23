import {
  IUser,
  ICreateUserService,
  ICreateUserDto,
  IUserRepository,
} from '@users/interfaces';
import { IUserProps, UserModel } from '@users/models';

import { IUUIDService } from '@common/interfaces/';

export class CreateUserService implements ICreateUserService {
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

    const user: IUser = UserModel.create(userProps);

    this.userRepository.create(user);
  }
}

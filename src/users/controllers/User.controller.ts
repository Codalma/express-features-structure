import { Request, Response, NextFunction } from 'express';

import { BaseController } from '@common/controllers';
import { ILoggerService } from '@common/interfaces/';

import {
  IUserController,
  ICreateUserService,
  ICreateUserDto,
} from '@users/interfaces';
import { UserMapper } from '@users/mappers';

export class UserController extends BaseController implements IUserController {
  public createUserUseCase: ICreateUserService;

  constructor(createUserUseCase: ICreateUserService, logger: ILoggerService) {
    super(logger);
    this.createUserUseCase = createUserUseCase;
    this.createUser = this.createUser.bind(this);
  }

  public async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userDTO: ICreateUserDto = UserMapper.toDTO(req.body.user);

      await this.createUserUseCase.execute(userDTO);

      this.logger.logInfo('User created successfully.');

      res.status(200).json({ message: 'User created successfully.' });
    } catch (error) {
      next(error);
    }
  }
}

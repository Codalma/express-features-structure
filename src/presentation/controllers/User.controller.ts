import { Request, Response, NextFunction } from 'express';

import { BaseController } from '@presentation/controllers/';
import { IUserController } from '@presentation/interfaces';

import { ICreateUserUseCase, ICreateUserDto } from '@application/interfaces';
import { UserMapper } from '@application/mappers';

import { ILoggerService } from '@domain/services';

export class UserController extends BaseController implements IUserController {
  public createUserUseCase: ICreateUserUseCase;

  constructor(createUserUseCase: ICreateUserUseCase, logger: ILoggerService) {
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

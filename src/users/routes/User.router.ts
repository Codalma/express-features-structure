import { Router } from 'express';

import { IUserController } from '@users/interfaces';
import { CreateUserService } from '@users/services';
import { UserController } from '@users/controllers';
import { UserRepository } from '@users/repositories';

import { UUIDLibrary, WinstonLibrary } from '@common/libraries';
import { winstonLogger } from '@common/configs';
import { LoggerService } from '@common/services';

const winstonLibrary = WinstonLibrary.getInstance(winstonLogger);
const logger = LoggerService.getInstance(winstonLibrary);

const uuidProvider = new UUIDLibrary();
const userRepository = new UserRepository();
const createUserUseCase = new CreateUserService(uuidProvider, userRepository);
const userController = new UserController(createUserUseCase, logger);

export class UserRouter {
  public router: Router;
  private readonly userController: IUserController;

  constructor(router: Router, userController: IUserController) {
    this.router = router;
    this.userController = userController;
    this.initRoutes();
  }

  initRoutes() {
    /**
     * @swagger
     * /users:
     *   post:
     *     summary: Retrieve a list of all users.
     *     description: Retrieve a list of all users.
     */
    this.router.post('/', this.userController.createUser);
  }
}

const router = Router();
export const userRouter = new UserRouter(router, userController);

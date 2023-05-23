import { Router } from 'express';

import { CreateUserUseCase } from '@application/useCases/user';

import { UserController } from '@presentation/controllers';

import { UUIDLibrary, WinstonLibrary } from '@infrastructure/libraries';
import { winstonLogger } from '@infrastructure/configs';
import { UserRepository } from '@infrastructure/repositories';
import { LoggerService } from '@application/services';
import { IUserController } from '@presentation/interfaces';

const winstonLibrary = WinstonLibrary.getInstance(winstonLogger);
const logger = LoggerService.getInstance(winstonLibrary);

const uuidProvider = new UUIDLibrary();
const userRepository = new UserRepository();
const createUserUseCase = new CreateUserUseCase(uuidProvider, userRepository);
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

import { Request, Response, NextFunction } from 'express';

import { UserController } from '@users/controllers';
import { UserMapper } from '@users/mappers';
import { createUserServiceMock } from '@mocks/users/services';
import { loggerServiceMock } from '@mocks/common/services';

describe('Scenario : User controller tests suite', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const userMapperToDTOMock = jest.spyOn(UserMapper, 'toDTO');

  const reqMock = {
    body: {
      user: {
        name: 'John Doe',
      },
    },
  } as Request;

  const resMock = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as unknown as Response;

  const nextMock = jest.fn() as NextFunction;

  describe('Given a user controller', () => {
    const userController = new UserController(
      createUserServiceMock,
      loggerServiceMock
    );

    describe('When calling the createUser method and an error occurred', () => {
      test('Then it should catch the error and forward it to the next middleware', async () => {
        // Arrange
        const error = new Error('Error in create user use case process.');
        createUserServiceMock.execute.mockRejectedValueOnce(error);

        // Act
        await userController.createUser(reqMock, resMock, nextMock);

        // Assert
        expect(nextMock).toHaveBeenCalledTimes(1);
        expect(nextMock).toHaveBeenCalledWith(error);
      });
    });

    describe('When calling the createUser method', () => {
      test('  Then it should map the user object to a userDTO using UserMapper', async () => {
        // Act
        await userController.createUser(reqMock, resMock, nextMock);

        // Assert
        expect(userMapperToDTOMock).toHaveBeenCalledTimes(1);
        expect(userMapperToDTOMock).toHaveBeenCalledWith(reqMock.body.user);
      });

      test('Then it should execute the createUserUseCase with the userDTO', async () => {
        // Arrange
        const userDTO = { name: 'John Doe' };

        // Act
        await userController.createUser(reqMock, resMock, nextMock);

        // Assert
        expect(createUserServiceMock.execute).toHaveBeenCalledTimes(1);
        expect(createUserServiceMock.execute).toHaveBeenCalledWith(userDTO);
      });

      test('Then it should log the user creation information using loggerService', async () => {
        // Arrange
        const information = 'User created successfully.';

        // Act
        await userController.createUser(reqMock, resMock, nextMock);

        // Assert
        expect(loggerServiceMock.logInfo).toHaveBeenCalledTimes(1);
        expect(loggerServiceMock.logInfo).toHaveBeenCalledWith(information);
      });

      test('it should return a 200 status code with a message using the response object', async () => {
        // Arrange
        const message = 'User created successfully.';

        // Act
        await userController.createUser(reqMock, resMock, nextMock);

        // Assert
        expect(resMock.status).toHaveBeenCalledTimes(1);
        expect(resMock.status).toHaveBeenCalledWith(200);

        expect(resMock.json).toHaveBeenCalledTimes(1);
        expect(resMock.json).toHaveBeenCalledWith({ message });
      });
    });
  });
});

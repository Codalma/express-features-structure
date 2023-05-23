import { ICreateUserDto, IUser } from '@users/interfaces';
import { CreateUserService } from '@users/services';
import { IUserProps, UserModel } from '@users/models';

import { userRepositoryMock } from '@mocks/users/repositories';
import { uuidServiceMock, uuidMock } from '@mocks/common/services';

describe('Scenario: User creation use case', () => {
  describe('Given a User creation use case is available', () => {
    // Arrange
    const spyUserEntityCreation = jest.spyOn(UserModel, 'create');

    const userName = 'John Doe';
    const userUUID = uuidMock;

    const userDTO: ICreateUserDto = {
      name: userName,
    };

    const userProps: IUserProps = {
      uuid: userUUID,
      name: userName,
    };

    const user: IUser = {
      uuid: userUUID,
      name: userName,
    };

    const createUserUseCase = new CreateUserService(
      uuidServiceMock,
      userRepositoryMock
    );

    describe('When calling the execute method of the CreateUserUseCase class', () => {
      // Act
      createUserUseCase.execute(userDTO);

      // Assert
      test('Then it should generate a user uuid using the uuid service', () => {
        expect(uuidServiceMock.generate).toHaveBeenCalledTimes(1);
        expect(uuidServiceMock.generate).toHaveBeenCalled();
      });

      test('Then it should create a user entity using UserEntity create method', () => {
        expect(spyUserEntityCreation).toHaveBeenCalledTimes(1);
        expect(spyUserEntityCreation).toHaveBeenCalledWith(userProps);
      });

      test('Then it should persist the user entity using the user repository', () => {
        expect(userRepositoryMock.create).toHaveBeenCalledTimes(1);
        expect(userRepositoryMock.create).toHaveBeenCalledWith(user);
      });
    });
  });
});

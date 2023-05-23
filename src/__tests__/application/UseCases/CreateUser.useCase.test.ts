import { CreateUserUseCase } from '@application/useCases/user';
import { ICreateUserDto } from '@application/interfaces';

import { userRepositoryMock } from '@mocks/infrastructure/repositories/user.repository.mock';
import { UUIDServiceMock } from '@mocks/application/services/UUIDServiceMock';
import { IUserProps, UserEntity } from '@domain/entities';
import { uuidMock } from '@mocks/domain/value-objects/uuid.mock';
import { IUser } from '@domain/interfaces';

describe('Scenario: User creation use case', () => {
  describe('Given a User creation use case is available', () => {
    // Arrange
    const spyUserEntityCreation = jest.spyOn(UserEntity, 'create');

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

    const createUserUseCase = new CreateUserUseCase(
      UUIDServiceMock,
      userRepositoryMock
    );

    describe('When calling the execute method of the CreateUserUseCase class', () => {
      // Act
      createUserUseCase.execute(userDTO);

      // Assert
      test('Then it should generate a user uuid using the uuid service', () => {
        expect(UUIDServiceMock.generate).toHaveBeenCalledTimes(1);
        expect(UUIDServiceMock.generate).toHaveBeenCalledWith();
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

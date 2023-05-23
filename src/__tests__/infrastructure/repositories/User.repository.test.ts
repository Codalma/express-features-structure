import { UserRepository } from '@infrastructure/repositories';
import { IUser } from '@domain/interfaces';
import { uuidMock } from '@mocks/domain/value-objects/uuid.mock';

describe('Scenario : User repository tests suite', () => {
  jest.spyOn(console, 'log');

  describe('Given a user repository', () => {
    let userRepository: UserRepository;
    const user: IUser = {
      uuid: uuidMock,
      name: 'John Doe',
    };

    beforeEach(() => {
      userRepository = new UserRepository();
    });

    describe('When the create method is called', () => {
      test('Then the user should be persisted successfully', () => {
        // Act
        userRepository.create(user);

        // Assert
        expect(console.log).toHaveBeenCalledTimes(1);
        expect(console.log).toHaveBeenCalledWith(
          'Infra - user repository: user created.',
          user
        );
      });
    });
  });
});

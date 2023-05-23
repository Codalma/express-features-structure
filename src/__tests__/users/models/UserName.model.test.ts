import { AppError } from '@common/exceptions';
import { UserNameModel } from '@users/models';

describe('Scenario: UserNameModel creation', () => {
  describe('Creating a valid user name', () => {
    const validUserName = 'JohnDoe';

    describe('When creating a UserNameModel instance', () => {
      test('Then it should return a new UserNameModel object', () => {
        // Act
        const userNameVo = UserNameModel.create(validUserName);

        // Assert
        expect(userNameVo).toBe('JohnDoe');
      });
    });
  });

  describe('Creating an invalid user name', () => {
    describe('When creating a UserNameModel instance', () => {
      const invalidUserName = '';

      test('Then it should throw a DomainError', () => {
        // Act and Assert
        expect(() => {
          UserNameModel.create(invalidUserName);
        }).toThrow(AppError.badRequest('You must provide a valid user name.'));
      });

      test('Then it should throw an error message', () => {
        // Act and Assert
        expect(() => {
          UserNameModel.create(invalidUserName);
        }).toThrowError('You must provide a valid user name.');
      });
    });
  });

  describe('Creating a user name with length less than 2 characters', () => {
    describe('When creating a UserNameModel instance', () => {
      const tooShortUserName = 'J';

      test('Then it should throw a DomainError', () => {
        // Act and Assert
        expect(() => {
          UserNameModel.create(tooShortUserName);
        }).toThrow(
          AppError.badRequest(
            'You must provide a name between 2 and 20 characters long.'
          )
        );
      });

      test('Then it should throw an error message', () => {
        // Act and Assert
        expect(() => {
          UserNameModel.create(tooShortUserName);
        }).toThrowError(
          'You must provide a name between 2 and 20 characters long.'
        );
      });
    });
  });

  describe('Creating a user name with length greater than 20 characters', () => {
    describe('When creating a UserNameModel instance', () => {
      const tooLongUserName = 'ThisUserNameIsLongerThanTwentyCharacters';

      test('Then it should throw a DomainError', () => {
        // Act and Assert
        expect(() => {
          UserNameModel.create(tooLongUserName);
        }).toThrow(
          AppError.badRequest(
            'You must provide a name between 2 and 20 characters long.'
          )
        );
      });

      test('Then it should throw an error message', () => {
        // Act and Assert
        expect(() => {
          UserNameModel.create(tooLongUserName);
        }).toThrowError(
          'You must provide a name between 2 and 20 characters long.'
        );
      });
    });
  });
});

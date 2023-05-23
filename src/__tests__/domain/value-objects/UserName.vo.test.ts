import { DomainError } from '@domain/exceptions';
import { UserNameVo } from '@domain/value-objects';

describe('Scenario: UserNameVo creation', () => {
  describe('Creating a valid user name', () => {
    const validUserName = 'JohnDoe';

    describe('When creating a UserNameVo instance', () => {
      test('Then it should return a new UserNameVo object', () => {
        // Act
        const userNameVo = UserNameVo.create(validUserName);

        // Assert
        expect(userNameVo).toBe('JohnDoe');
      });
    });
  });

  describe('Creating an invalid user name', () => {
    describe('When creating a UserNameVo instance', () => {
      const invalidUserName = '';

      test('Then it should throw a DomainError', () => {
        // Act and Assert
        expect(() => {
          UserNameVo.create(invalidUserName);
        }).toThrow(
          DomainError.badRequest('You must provide a valid user name.')
        );
      });

      test('Then it should throw an error message', () => {
        // Act and Assert
        expect(() => {
          UserNameVo.create(invalidUserName);
        }).toThrowError('You must provide a valid user name.');
      });
    });
  });

  describe('Creating a user name with length less than 2 characters', () => {
    describe('When creating a UserNameVo instance', () => {
      const tooShortUserName = 'J';

      test('Then it should throw a DomainError', () => {
        // Act and Assert
        expect(() => {
          UserNameVo.create(tooShortUserName);
        }).toThrow(
          DomainError.badRequest(
            'You must provide a name between 2 and 20 characters long.'
          )
        );
      });

      test('Then it should throw an error message', () => {
        // Act and Assert
        expect(() => {
          UserNameVo.create(tooShortUserName);
        }).toThrowError(
          'You must provide a name between 2 and 20 characters long.'
        );
      });
    });
  });

  describe('Creating a user name with length greater than 20 characters', () => {
    describe('When creating a UserNameVo instance', () => {
      const tooLongUserName = 'ThisUserNameIsLongerThanTwentyCharacters';

      test('Then it should throw a DomainError', () => {
        // Act and Assert
        expect(() => {
          UserNameVo.create(tooLongUserName);
        }).toThrow(
          DomainError.badRequest(
            'You must provide a name between 2 and 20 characters long.'
          )
        );
      });

      test('Then it should throw an error message', () => {
        // Act and Assert
        expect(() => {
          UserNameVo.create(tooLongUserName);
        }).toThrowError(
          'You must provide a name between 2 and 20 characters long.'
        );
      });
    });
  });
});

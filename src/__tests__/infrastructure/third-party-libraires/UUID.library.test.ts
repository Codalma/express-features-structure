import { UUIDLibrary } from '@infrastructure/libraries';
const crypto = require('crypto');

describe('Scenario: Generate an UUID', () => {
  describe('Given a UUID library is available', () => {
    describe('When the generate method is called', () => {
      test('Then it should return an UUID', () => {
        // Arrange
        const cryptoMock = jest
          .spyOn(crypto, 'randomUUID')
          .mockReturnValue('mocked-uuid');

        // Act
        const uuidValue: string = new UUIDLibrary().generate();

        // Assert
        expect(cryptoMock).toHaveBeenCalled();
        expect(uuidValue).toBe('mocked-uuid');
      });
    });
  });
});

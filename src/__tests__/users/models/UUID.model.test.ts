import { AppError } from '@common/exceptions';
import { UUIDModel } from '@common/models';

describe('Scenario: UUIDVo tests suite', () => {
  describe('Given a valid UUID', () => {
    const validUUID = '1a76aaf5-605d-4bde-a49b-77d0642f90b8';

    describe('When creating a new UUID', () => {
      // Act
      const uuid = UUIDModel.create(validUUID);

      test('Then it should return the same UUID value.', () => {
        // Assert
        expect(uuid).toBe(validUUID);
      });
    });
  });

  describe('Given an invalid UUID', () => {
    const invalidUUID = 'invalid-uuid';

    describe('When creating a new UUID', () => {
      test('Then it should throw a DomainError', () => {
        // Arrange
        const expectedError = AppError.badRequest(
          'You must provide a valid UUID.'
        );

        // Act & Assert
        expect(() => {
          UUIDModel.create(invalidUUID);
        }).toThrow(expectedError);

        expect(() => {
          UUIDModel.create(invalidUUID);
        }).toThrowError('You must provide a valid UUID.');
      });
    });
  });
});

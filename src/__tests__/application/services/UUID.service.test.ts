import { UUIDService } from '@application/services';
import { UUIDServiceMock } from '@mocks/application/services/UUIDServiceMock';

describe('Scenario: UUID service tests suite', () => {
  describe('Given a UUID service is available', () => {
    // Arrange
    const uuidService = new UUIDService(UUIDServiceMock);

    describe('When calling the generate method', () => {
      test('Then it should call the UUID service generate method', () => {
        // Act
        uuidService.generate();

        // Assert
        expect(UUIDServiceMock.generate).toHaveBeenCalledTimes(1);
        expect(UUIDServiceMock.generate).toHaveBeenCalledWith();
      });
    });
  });
});

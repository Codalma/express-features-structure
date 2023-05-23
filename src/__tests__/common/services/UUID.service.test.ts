import { UUIDService } from '@common/services';
import { uuidServiceMock } from '@mocks/common/services/';

describe('Scenario: UUID service tests suite', () => {
  describe('Given a UUID service is available', () => {
    // Arrange
    const uuidService = new UUIDService(uuidServiceMock);

    describe('When calling the generate method', () => {
      test('Then it should call the UUID service generate method', () => {
        // Act
        uuidService.generate();

        // Assert
        expect(uuidServiceMock.generate).toHaveBeenCalledTimes(1);
        expect(uuidServiceMock.generate).toHaveBeenCalledWith();
      });
    });
  });
});

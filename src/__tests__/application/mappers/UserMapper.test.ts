import { ICreateUserDto } from '@application/interfaces';
import { UserMapper } from '@application/mappers';

describe('Scenario : mapping user input to user DTO', () => {
  describe('Given a user input object', () => {
    describe('When the toDTO method of UserMapper is called with a user input object', () => {
      test('Then it should return a user DTO', () => {
        // Arrange
        const inputs: ICreateUserDto = {
          name: 'John Doe',
        };

        // Act
        const userDTO = UserMapper.toDTO(inputs);

        // Assert
        expect(userDTO.name).toBe('John Doe');
      });
    });
  });
});

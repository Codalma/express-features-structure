import { UserEntity } from '@domain/entities';
import { uuidMock } from '@mocks/domain/value-objects/uuid.mock';

describe('Scenario : UserEntity tests suite', () => {
  describe('Given user properties', () => {
    const userProps = {
      uuid: uuidMock,
      name: 'John Doe',
    };

    describe('When creating a new user', () => {
      const user = UserEntity.create(userProps);

      test('Then it should have a UUID', () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        expect(user.uuid).toBe(uuidMock);
      });

      test('Then it should have a username value object', () => {
        expect(user.name).toBe('John Doe');
      });

      describe('And When calling the "equals" method', () => {
        test('Then it should return true when comparing to an identical user', () => {
          const sameUser = UserEntity.create(userProps);
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          expect(user.equals(sameUser)).toBe(true);
        });

        test('Then it should return false when comparing to a different user', () => {
          const differentUserProps = {
            uuid: '9b74aaf5-605d-4bde-a49b-77d0642f90b8',
            name: 'Jane Smith',
          };
          const differentUser = UserEntity.create(differentUserProps);
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          expect(user.equals(differentUser)).toBe(false);
        });
      });
    });
  });
});

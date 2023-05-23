import { UserRouter } from '@users/routes';

import { routerMock } from '@mocks/common/router.mock';
import { userControllerMock } from '@mocks/users/controllers';

describe('Scenario : User router initialization', () => {
  describe('Given a valid router and user controller', () => {
    describe('When the UserRouter is created with the router and user controller', () => {
      test(' Then it should initializes each user route with appropriate correct controller', () => {
        // Act
        const userRouter = new UserRouter(routerMock, userControllerMock);

        // Assert
        expect(routerMock.post).toHaveBeenCalledTimes(1);
        expect(routerMock.post).toHaveBeenCalledWith(
          '/',
          userControllerMock.createUser
        );
      });
    });
  });
});

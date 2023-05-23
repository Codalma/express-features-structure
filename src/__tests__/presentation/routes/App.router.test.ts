import { AppRouter } from '@presentation/App.router';
import { routerMock } from '@mocks/presentation/router.mock';

describe('Scenario : App router initialization', () => {
  describe('Given a valid router instance', () => {
    describe('When the addRoute method is called with a valid path and sub router', () => {
      test(' Then it should add the sub route to the main router', () => {
        // Arrange
        const appRouter = new AppRouter(routerMock);

        const path = '/path';
        const subRouter = routerMock;

        // Act
        appRouter.addRoute(path, subRouter);

        // Assert
        expect(routerMock.use).toHaveBeenCalledTimes(1);
        expect(routerMock.use).toHaveBeenCalledWith(path, subRouter);
      });
    });
  });
});

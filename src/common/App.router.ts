import { Router } from 'express';

export class AppRouter {
  public router: Router;

  constructor(router: Router) {
    this.router = router;
  }

  addRoute(path: string, router: Router) {
    this.router.use(path, router);
  }
}

const router = Router();
export const appRouter = new AppRouter(router);

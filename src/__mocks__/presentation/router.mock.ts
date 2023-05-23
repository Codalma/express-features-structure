import { Router } from 'express';

export const routerMock = {
  use: jest.fn(),
  post: jest.fn(),
} as unknown as Router;

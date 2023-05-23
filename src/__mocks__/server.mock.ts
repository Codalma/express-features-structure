import { Server } from 'http';

export const serverMock = {
  listen: jest.fn(),
} as unknown as Server;

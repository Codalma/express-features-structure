import { IUUIDService } from '@domain/services';

const crypto = require('crypto');
export class UUIDLibrary implements IUUIDService {
  generate(): string {
    return crypto.randomUUID();
  }
}

import { IUUIDService } from '@common/interfaces';

const crypto = require('crypto');
export class UUIDLibrary implements IUUIDService {
  generate(): string {
    return crypto.randomUUID();
  }
}

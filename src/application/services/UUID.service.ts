import { IUUIDService } from '@domain/services/IUUID.service';

export class UUIDService {
  private uuidProvider: IUUIDService;

  constructor(uuidProvider: IUUIDService) {
    this.uuidProvider = uuidProvider;
  }

  generate() {
    return this.uuidProvider.generate();
  }
}

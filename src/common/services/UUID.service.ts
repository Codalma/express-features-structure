import { IUUIDService } from '@common/interfaces';

export class UUIDService {
  private uuidProvider: IUUIDService;

  constructor(uuidProvider: IUUIDService) {
    this.uuidProvider = uuidProvider;
  }

  generate() {
    return this.uuidProvider.generate();
  }
}

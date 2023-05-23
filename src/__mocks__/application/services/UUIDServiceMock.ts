import { IUUIDService } from '@domain/services';
import { uuidMock } from '@mocks/domain/value-objects/uuid.mock';

export const UUIDServiceMock: IUUIDService = {
  generate: jest.fn().mockReturnValue(uuidMock),
};

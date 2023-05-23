import { IUUIDService } from '@common/interfaces';

export const uuidMock = '1a76aaf5-605d-4bde-a49b-77d0642f90b8';

export const uuidServiceMock: IUUIDService = {
  generate: jest.fn().mockReturnValue(uuidMock),
};

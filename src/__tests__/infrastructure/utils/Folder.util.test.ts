/* eslint-disable @typescript-eslint/ban-ts-comment */

// @ts-ignore
import path from 'path';
// @ts-ignore
import fs from 'fs';

import { FolderUtil } from '@infrastructure/utils';

describe('Scenario : Folder util tests suite', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const fsExistsSyncMock = jest.spyOn(fs, 'existsSync');
  const fsMkDirSyncMock = jest.spyOn(fs, 'mkdirSync');

  const pathJoinMock = jest.spyOn(path, 'join');

  pathJoinMock.mockImplementation();
  fsMkDirSyncMock.mockImplementation();

  describe('Given a Folder util', () => {
    describe('When calling the create method', () => {
      test('Then it should create an absolute path', () => {
        // Arrange
        const folderUtil = new FolderUtil();
        const dirPath = '/dirPath';

        // Act
        folderUtil.create(dirPath);

        // Assert
        expect(pathJoinMock).toHaveBeenCalledTimes(1);
      });

      test('Then it should throw an error if the folder already exists', () => {
        // Arrange
        const absolutePathMock = 'test';
        pathJoinMock.mockReturnValue(absolutePathMock);

        const error = new Error(
          `Directory already exists: ${absolutePathMock}`
        );

        fsExistsSyncMock.mockReturnValue(true);

        const folderUtil = new FolderUtil();
        const dirPath = '/dirPath';

        // Act and assert
        expect(() => folderUtil.create(dirPath)).toThrow(error);
      });

      test('Then it should create the folder if it does not exist', () => {
        // Arrange
        const absolutePathMock = 'test';
        pathJoinMock.mockReturnValue(absolutePathMock);

        fsExistsSyncMock.mockReturnValue(false);

        const folderUtil = new FolderUtil();
        const dirPath = '/dirPath';

        // Act
        folderUtil.create(dirPath);

        // Assert
        expect(fsMkDirSyncMock).toHaveBeenCalledTimes(1);
        expect(fsMkDirSyncMock).toHaveBeenCalledWith(absolutePathMock, {
          recursive: true,
        });
      });
    });
  });
});

/* eslint-disable security/detect-non-literal-fs-filename */
import fs from 'fs';
import path from 'path';

import { IFolderUtil } from '@infrastructure/interfaces';

export class FolderUtil implements IFolderUtil {
  public create(dirPath: string) {
    const absolutePath = path.join(__dirname, dirPath);

    if (!fs.existsSync(absolutePath)) {
      fs.mkdirSync(absolutePath, { recursive: true });
    } else {
      throw new Error(`Directory already exists: ${absolutePath}`);
    }
  }
}

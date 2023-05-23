import { Request, Express } from 'express';
import multer from 'multer';

import { FolderUtil } from '@infrastructure/utils';

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpeg',
  'image/png': 'png',
};

const folderManager = new FolderUtil();

const mediaStorage = (folderPath: string) => {
  return multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, callback) => {
      folderManager.create(folderPath);
      callback(null, folderPath);
    },
    filename: (req: Request, file, callback) => {
      const name = file.originalname
        .split(' ')
        .join('-')
        .split('.')
        .slice(0, -1)
        .join('.');
      const randomSuffix = Math.random().toString(36).substring(2, 8);
      const extension = MIME_TYPES[file.mimetype as keyof typeof MIME_TYPES];

      callback(null, `${name}-${randomSuffix}.${extension}`);
    },
  });
};

exports.media = multer({
  storage: mediaStorage('public/uploads'),
}).single('req_file_name');

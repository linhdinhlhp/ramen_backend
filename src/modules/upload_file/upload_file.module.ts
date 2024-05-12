import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage} from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { Request } from 'express';
import * as path from 'path';
import { UploadController } from './upload_file.controller';
import { UploadService } from './upload_file.service';
import { Express } from 'express';

@Module({
  imports: [
    MulterModule.registerAsync({
      useFactory: () => ({
        storage: diskStorage({
          destination: './src/uploads/',
          filename: (req: Request, file: Express.Multer.File, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            cb(null, `${uniqueSuffix}-${file.originalname}`);
          },
        }),
      }),
    }),
  ],
  
  exports: [MulterModule],
  controllers: [UploadController],
  providers: [UploadService]
})
export class UploadModule {}



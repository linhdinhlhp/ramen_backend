import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UploadService {
  constructor(private readonly configService: ConfigService) {
    cloudinary.config({
      cloud_name: 'dwz1zvmit',
      api_key: '776693177459465',
      api_secret: 'kTj2vf3ZpC66w1VGptienZBv0fE',
    });
  }

  async uploadImageFromUrl(url: string) {
    try {
      const result = await cloudinary.uploader.upload(url);
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async uploadImageFromLocal({
    path,
    folderName = 'product/8469',
  }: {
    path: string;
    folderName?: string;
  }) {
    try {
      const result = await cloudinary.uploader.upload(path, {
        folder: folderName,
        resource_type: 'raw',
      });
      // console.log(result);

      return {
        file_url: result.secure_url,
        file_bytes: result.bytes,

        // thumb_url: await cloudinary.url(result.public_id, {
        //   width: 500,
        //   height: 500,
        //   crop: 'fill',
        //   format: 'jpg',
        // }),
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async uploadImageFromFromLocalFiles({
    files,
    folderName = 'product/8469',
  }: {
    files: Express.Multer.File[];
    folderName?: string;
  }) {
    try {
      if (!files || files.length === 0) {
        throw new Error('Please upload a file');
      }
      const result = await Promise.all(
        files.map(async (file) => {
          const image = await cloudinary.uploader.upload(file.path, {
            folder: folderName,
            resource_type: 'raw',
          });
          return {
            image_url: image.secure_url,
            thumb_url: await cloudinary.url(image.public_id, {
              width: 500,
              height: 500,
              crop: 'fill',
              format: 'jpg',
            }),
          };
        }),
      );
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

import { Controller, Post, UploadedFile, UseInterceptors, Req, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request, Response } from 'express';
import { UploadService } from "./upload_file.service";


@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

//   @Post('from-url')
//   async uploadFromUrl(@Req() req: Request, @Res() res: Response) {
//     try {
//       const metadata = await this.uploadService.uploadImageFromUrl(req.file);
//       return res.status(200).json({
//         message: 'File uploaded successfully',
//         metadata,
//       });
//     } catch (error) {
//       // Handle errors appropriately
//       return res.status(500).json({ error: 'Internal Server Error' });
//     }
//   }

  @Post('single-file-from-local')
  @UseInterceptors(FileInterceptor('file'))
  async uploadSingleImageFromLocal(@UploadedFile() file: Express.Multer.File, @Req() req: Request, @Res() res: Response) {
    try {
      if (!file) {
        throw new Error('Please upload a file');
      }
      console.log("ddax chay");
      const metadata = await this.uploadService.uploadImageFromLocal({
        path: file.path,
        folderName: `File`,
        // ${req.user.userId}
      });
      console.log("ddax chay  sau medata");

      return res.status(200).json({
        message: 'File uploaded successfully',
        metadata,
      });
    } catch (error) {
      // Handle errors appropriately
      return res.status(400).json({ error: error.message });
    }
  }

  @Post('image-from-local-files')
  @UseInterceptors(FileInterceptor('files'))
  async uploadImageFromLocalFiles(@UploadedFile() files: Express.Multer.File[], @Req() req: Request, @Res() res: Response) {
    try {
      if (!files || files.length === 0) {
        throw new Error('Please upload a file');
      }
      const metadata = await this.uploadService.uploadImageFromFromLocalFiles({
        files,
        folderName: `image`,
      });
      return res.status(200).json({
        message: 'Files uploaded successfully',
        metadata,
      });
    } catch (error) {
      // Handle errors appropriately
      return res.status(400).json({ error: error.message });
    }
  }
}

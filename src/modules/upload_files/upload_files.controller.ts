import {
  Controller,
  Get,
  StreamableFile,
  Res,
  UploadedFiles,
  HttpCode,
  HttpStatus,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';
import type { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes } from '@nestjs/swagger';

// export const uploadFiles=
//     (fileName = "file"): MethodDecorator=> {
//         // ApiBody({
//         //     schema:{
//         //         type: "object",
//         //         properties:{
//         //             [fileName]:{
//         //                 type:"array",
//         //                 items: {

//         //                 }
//         //             }
//         //         }

//         //     }
//         // })

//     }

@Controller('file')
export class FileController {
  @Get('/download')
  getFile(@Res({ passthrough: true }) res: Response): StreamableFile {
    const file = createReadStream(join(process.cwd(), 'package.json'));
    res.set({
      'Content-Type': 'application/json',
      'Content-Disposition': 'attachment; filename="package.json"',
    });
    return new StreamableFile(file);
  }

  @HttpCode(HttpStatus.CREATED)
  @ApiConsumes('multipart/form-data')
  // @uploadFiles("filename")
  @UseInterceptors(FileInterceptor('file'))
  @Post('/upload-file')
  uploadFile(@UploadedFile() file) {
    // : Array<Express.Multer.File
    console.log(file);
  }

  //   // Or even:
  //   @Get()
  //   @Header('Content-Type', 'application/json')
  //   @Header('Content-Disposition', 'attachment; filename="package.json"')
  //   getStaticFile(): StreamableFile {
  //     const file = createReadStream(join(process.cwd(), 'package.json'));
  //     return new StreamableFile(file);
  //   }
  // }

  // function uploadFile(arg0: any, file: ReadStream, File: any) {
  //     throw new Error('Function not implemented.');
}

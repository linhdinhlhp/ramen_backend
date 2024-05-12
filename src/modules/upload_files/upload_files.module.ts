
import { Module } from "@nestjs/common";
import { FileController } from "./upload_files.controller";


@Module({
    controllers:[FileController]
  })
export class FileModule {}
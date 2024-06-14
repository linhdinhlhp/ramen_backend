import { Module } from '@nestjs/common';
import { MetadataScanner } from '@nestjs/core';
import { AuthzModule } from 'src/modules/authz/authz.module';
import { VersionsController } from './versions.controller';
import { VersionsService } from './versions.service';
import { VersionsRepository } from 'src/db/repositories/version-document.respository';
import { UploadModule } from 'src/modules/uploadFile/upload_file.module';

@Module({
  imports: [AuthzModule, UploadModule],
  controllers: [VersionsController],
  providers: [MetadataScanner, VersionsService, VersionsRepository],
})
class VersionsModule {}

export { VersionsModule as DocumentVersionsModule };

import { Module } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { DocumentsController } from './documents.controller';
import { DocumentRepository } from 'src/db/repositories/document.repository';
import { MetadataScanner } from '@nestjs/core';
import { AuthzModule } from 'src/modules/authz/authz.module';

@Module({
  imports: [AuthzModule],
  controllers: [DocumentsController],
  providers: [MetadataScanner, DocumentsService, DocumentRepository],
})
class DocumentsModule {}

export { DocumentsModule as OrganizationDocumentsModule };

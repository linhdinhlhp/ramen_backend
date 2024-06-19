import { Module } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { DocumentsController } from './documents.controller';
import { DocumentRepository } from 'src/db/repositories/document.repository';
import { MetadataScanner } from '@nestjs/core';
import { AuthzModule } from 'src/modules/authz/authz.module';
import { SubscriptionRepository } from 'src/db/repositories/subscription.repository';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [AuthzModule, HttpModule],
  controllers: [DocumentsController],
  providers: [
    MetadataScanner,
    DocumentsService,
    DocumentRepository,
    SubscriptionRepository,
  ],
})
class DocumentsModule {}

export { DocumentsModule as OrganizationDocumentsModule };

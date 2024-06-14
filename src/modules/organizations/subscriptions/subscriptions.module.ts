import { Module } from '@nestjs/common';
import { MetadataScanner } from '@nestjs/core';
import { AuthzModule } from 'src/modules/authz/authz.module';
import { SubscriptionsController } from './subscriptions.controller';
import { SubscriptionsService } from './subscriptions.service';
import { SubscriptionRepository } from 'src/db/repositories/subscription.repository';

@Module({
  imports: [AuthzModule],
  controllers: [SubscriptionsController],
  providers: [MetadataScanner, SubscriptionsService, SubscriptionRepository],
})
class SubscriptionsModule {}

export { SubscriptionsModule as OrganizationDocumentSubscriptionsModule };

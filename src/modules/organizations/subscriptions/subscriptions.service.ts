import { Injectable } from '@nestjs/common';
import { SubscriptionRepository } from 'src/db/repositories/subscription.repository';
import {
  SubscriptionsResponseDto,
  SubscriptionsResponseListDto,
} from './dto/subscription-response.dto';
import { CreateSubscriptionsRequestDto } from './dto/create-subscription-request.dto';
import { DocumentSubscription } from 'src/db/entities/subscription.entity';

@Injectable()
export class SubscriptionsService {
  constructor(
    private readonly subscriptionRepository: SubscriptionRepository,
  ) {}

  async findAll(
    // organizationId: number,
    documentId: number,
  ): Promise<SubscriptionsResponseListDto> {
    const subs = await this.subscriptionRepository.findSubscriptionsForDocument(
      documentId,
    );

    const subsDtos = subs.map((sub) => new SubscriptionsResponseDto(sub));

    const result = new SubscriptionsResponseListDto();
    result.subscriptions = subsDtos;
    result.metadata = {
      total: subsDtos.length,
    };

    return result;
  }

  async create(
    organizationId: number,
    documentId: number,
    request: CreateSubscriptionsRequestDto,
    userId: number,
  ): Promise<DocumentSubscription> {
    const { byEmail, bySMS, createdAt } = request;

    const documentSubscription = new DocumentSubscription();

    documentSubscription.documentId = documentId;
    documentSubscription.byEmail = byEmail;
    documentSubscription.bySMS = bySMS;
    documentSubscription.createdAt = createdAt;
    documentSubscription.userId = userId;

    await this.subscriptionRepository.manager.transaction(async (manager) => {
      await manager.save(DocumentSubscription, documentSubscription);
    });

    return documentSubscription;
  }
}

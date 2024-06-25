import { Injectable, NotFoundException } from '@nestjs/common';
import { SubscriptionRepository } from 'src/db/repositories/subscription.repository';
import {
  SubscriptionsResponseDto,
  SubscriptionsResponseListDto,
} from './dto/subscription-response.dto';
import { CreateSubscriptionsRequestDto } from './dto/create-subscription-request.dto';
import { DocumentSubscription } from 'src/db/entities/subscription.entity';
import { UpdateSubscriptionsRequestDto } from './dto/update-subscription-request.dto';

@Injectable()
export class SubscriptionsService {
  constructor(
    private readonly subscriptionRepository: SubscriptionRepository,
  ) {}

  async findAll(
    organizationId: number,
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
    const { byEmail, bySMS, email, phone } = request;

    const documentSubscription = new DocumentSubscription();

    const existedSubscription = await this.subscriptionRepository.findOne({
      where: { userId, documentId },
    });

    if (existedSubscription) {
      documentSubscription.id = existedSubscription.id;
      if (byEmail) documentSubscription.byEmail = byEmail ?? false;
      if (bySMS) documentSubscription.bySMS = bySMS ?? false;
      if (email) documentSubscription.email = email;
      if (phone) documentSubscription.phone = phone;

      console.log('sau update', documentSubscription);
      await this.subscriptionRepository.save(documentSubscription);
    } else {
      documentSubscription.documentId = documentId;
      documentSubscription.byEmail = byEmail ?? false;
      documentSubscription.bySMS = bySMS ?? false;
      documentSubscription.userId = userId;
      documentSubscription.email = email;
      documentSubscription.phone = phone;

      await this.subscriptionRepository.manager.transaction(async (manager) => {
        await manager.save(DocumentSubscription, documentSubscription);
      });
    }

    return documentSubscription;
  }

  async update(
    organizationId: number,
    id: number,
    req: UpdateSubscriptionsRequestDto,
  ) {
    const { byEmail, bySMS, email, phone } = req;
    const sub = await this.subscriptionRepository.findSubForDocument(id);
    console.log(sub);

    if (!sub) {
      throw new NotFoundException(
        `Sub${id} does not belong to the organization ${organizationId}`,
      );
    }

    if (byEmail) sub.byEmail = byEmail;
    if (bySMS) sub.bySMS = bySMS;
    if (email) sub.email = email;
    if (phone) sub.phone = phone;

    console.log('sau update', sub);
    await this.subscriptionRepository.manager.transaction(async (manager) => {
      await manager.save(DocumentSubscription, sub);
    });

    return sub;
  }

  async findOne(
    organizationId: number,
    documentId: number,
    userId: number,
  ): Promise<SubscriptionsResponseDto> {
    const subState = await this.subscriptionRepository.findSubscriptionState(
      documentId,
      userId,
    );
    if (!subState) {
      throw new NotFoundException(
        `Document ${documentId} and ${userId} does not exist in the subscription`,
      );
    }

    return subState;
  }
}

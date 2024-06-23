import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { DocumentSubscription } from '../entities/subscription.entity';

@Injectable()
export class SubscriptionRepository extends Repository<DocumentSubscription> {
  constructor(private dataSource: DataSource) {
    super(DocumentSubscription, dataSource.createEntityManager());
  }

  async findSubscriptionsForDocument(
    documentId: number,
  ): Promise<DocumentSubscription[]> {
    const allSubs = await this.createQueryBuilder('documentSubscriptions')
      .where('documentSubscriptions.documentId = :documentId', {
        documentId: documentId,
      })
      .getMany();

    return allSubs;
  }

  async findSubscriptionState(
    documentId: number,
    userId: number,
  ): Promise<DocumentSubscription> {
    const sub = await this.createQueryBuilder('documentSubscriptions')
      .where('documentSubscriptions.documentId = :documentId', {
        documentId: documentId,
      })
      .andWhere('documentSubscriptions.userId = :userId', {
        userId: userId,
      })
      .getOne();

    return sub;
  }

  async findSubForDocument(id: number): Promise<DocumentSubscription> {
    return await this.createQueryBuilder('documentSubscriptions')
      .where('documentSubscriptions.id = :id', { id: id })
      .getOne();
  }

  async getPhones(documentId: number): Promise<string[]> {
    const subscriptions = await this.createQueryBuilder('documentSubscriptions')
      .where('documentSubscriptions.documentId = :documentId', { documentId })
      .getMany();

    return subscriptions.map((subscription) => subscription.phone);
  }
}

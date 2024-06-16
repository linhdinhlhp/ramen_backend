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

  async findSubForDocument(id: number): Promise<DocumentSubscription> {
    return await this.createQueryBuilder('documentSubscriptions')
      .where('documentSubscriptions.id = :id', { id: id })
      .getOne();
  }
}

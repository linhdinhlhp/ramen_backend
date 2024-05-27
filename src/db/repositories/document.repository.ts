// import { getOrgUniqueName } from 'src/utils/organization';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Invoice } from 'src/db/entities';
import { InvoiceSearchRequestDto } from 'src/modules/organizations/invoices/dto/invoice-search-request.dto';
import { isAfter, isBefore, isEqual } from 'date-fns';
import { Document } from '../entities/document.entity';

@Injectable()
export class DocumentRepository extends Repository<Document> {
  constructor(private dataSource: DataSource) {
    super(Document, dataSource.createEntityManager());
  }

  async findDocumentsForOrganization(
    organizationId: number,
  ): Promise<Document[]> {
    const allDocuments = await this.createQueryBuilder('document')
      .where('document.organizationId = :organizationId', {
        organizationId: organizationId,
      })
      .getMany();

    return allDocuments;
  }

  async findDocumentForOrganization(
    organizationId: number,
    id: number,
  ): Promise<Document> {
    console.log(id);
    return await this.createQueryBuilder('document')
      .where('document.organizationId = :organizationId', { organizationId })
      .andWhere('document.id = :id', { id })
      .getOne();
  }
}

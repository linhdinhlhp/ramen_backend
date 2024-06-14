import { Injectable, NotFoundException } from '@nestjs/common';
import { DocumentRepository } from 'src/db/repositories/document.repository';
import { Document } from 'src/db/entities';
import {
  DocumentResponseListDto,
  DocumentResponseDto,
} from './dto/document-response.dto';
import { CreateDocumentRequestDto } from './dto/create-document-request.dto.ts';
import { v4 as uuidv4 } from 'uuid';
import { UpdateDocumentRequestDto } from './dto/update-document-request.dto';

@Injectable()
export class DocumentsService {
  constructor(private readonly documentRepository: DocumentRepository) {}

  async findAll(organizationId: number): Promise<DocumentResponseListDto> {
    const documents =
      await this.documentRepository.findDocumentsForOrganization(
        organizationId,
      );

    // console.log(documents);

    const documentDtos = documents.map(
      (document) => new DocumentResponseDto(document),
    );

    const result = new DocumentResponseListDto();
    result.documents = documentDtos;
    result.metadata = {
      total: documentDtos.length,
    };

    return result;
  }
  // find a detail document for an organization
  async findOne(
    organizationId: number,
    document_id: number,
  ): Promise<Document> {
    const document = await this.documentRepository.findDocumentForOrganization(
      organizationId,
      document_id,
    );
    if (!document) {
      throw new NotFoundException(
        `Document ${document_id} does not belong to the organization ${organizationId}`,
      );
    }

    return document;
  }

  async create(
    organizationId: number,
    request: CreateDocumentRequestDto,
    userId: number,
  ): Promise<Document> {
    const { document_name, createdAt, note } = request;
    // Create a document
    const document = new Document();

    document.document_name = document_name;
    document.organizationId = organizationId;
    document.createdAt = createdAt;
    document.document_id = uuidv4();
    document.note = note;
    document.user_id = userId;
    // document.created_by = created_by;

    await this.documentRepository.manager.transaction(async (manager) => {
      await manager.save(Document, document);
    });

    return document;
  }

  async update(
    organizationId: number,
    documentId: number,
    req: UpdateDocumentRequestDto,
  ) {
    const { document_name, createdAt, note, url } = req;
    const document = await this.documentRepository.findOne({
      where: { id: documentId, organizationId },
    });

    if (!document) {
      throw new NotFoundException(
        `Document ${documentId} does not belong to the organization ${organizationId}`,
      );
    }

    if (document_name) document.document_name = document_name;
    if (createdAt) document.createdAt = createdAt;
    if (note) document.note = note;
    if (url) document.url = url;

    await this.documentRepository.manager.transaction(async (manager) => {
      await manager.save(Document, document);
    });

    return document;
  }

  async delete(organizationId: number, documentId: number): Promise<void> {
    console.log(`finding`);
    const document = await this.documentRepository.findOne({
      where: { id: documentId, organizationId },
    });

    if (!document) {
      throw new NotFoundException(
        `Document ${documentId} doesn't belong to organization ${organizationId}`,
      );
    }

    console.log(`deleting`);

    await this.documentRepository.manager.transaction(async (manager) => {
      const deletePromises = [];

      // deletePromises.push(
      //   manager.delete(Document, { organizationId, id: documentId }),
      // );
      deletePromises.push(manager.delete(Document, { id: documentId }));
      //deletePromises.push(manager.delete(Versions, {documentId}))

      await Promise.all(deletePromises);
    });
  }
}

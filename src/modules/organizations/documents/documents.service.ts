import { Injectable, NotFoundException } from '@nestjs/common';
import { DocumentRepository } from 'src/db/repositories/document.repository';
import { Document } from 'src/db/entities';
import {
  DocumentResponseListDto,
  DocumentResponseDto,
} from './dto/document-response.dto';

@Injectable()
export class DocumentsService {
  constructor(private readonly documentRepository: DocumentRepository) {}

  async findAll(organizationId: number): Promise<DocumentResponseListDto> {
    const documents =
      await this.documentRepository.findDocumentsForOrganization(
        organizationId,
      );

    console.log(documents);

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
}

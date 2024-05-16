import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import { CurrencyType, Invoice, InvoiceType } from 'src/db/entities';
import { OrganizationUserResponseDto } from 'src/modules/common/dto/organization-user-response.dto';
import { InvoiceItem } from 'src/db/entities/invoice-item.entity';
import { Document } from 'src/db/entities/document.entity';

export class DocumentResponseDto {
  constructor(document: Document) {
    this.id = document.id;
    this.document_id = document.document_id;
    this.document_name = document.document_name;
    this.created_by = document.created_by;
    this.organizationId = document.organizationId;
    this.createdAt = document.createdAt;
  }

  @ApiResponseProperty({
    type: Number,
    example: 1,
  })
  id: number;

  @ApiResponseProperty({
    type: String,
    example: 'ABC123',
  })
  document_id: string;

  @ApiResponseProperty({
    type: String,
    example: 'abcxyz.txt',
  })
  document_name: string;

  @ApiResponseProperty({
    type: String,
    example: 'abcxyz.txt',
  })
  created_by: string;

  @ApiResponseProperty({
    type: Number,
    example: 1,
  })
  organizationId: number;

  @ApiResponseProperty({
    type: Date,
    example: '2024-02-26T07:31:35.000Z',
  })
  createdAt: Date;
}

class MetaData {
  @ApiProperty({
    type: Number,
  })
  total: number;
}

export class DocumentResponseListDto {
  @ApiResponseProperty({
    type: [DocumentResponseDto],
  })
  documents: DocumentResponseDto[];

  @ApiResponseProperty({
    type: MetaData,
  })
  metadata: MetaData;
}

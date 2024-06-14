import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';

import { Document } from 'src/db/entities/document.entity';

export class DocumentResponseDto {
  constructor(document: Document) {
    this.id = document.id;
    this.document_id = document.document_id;
    this.document_name = document.document_name;
    this.created_by = document.created_by;
    this.organizationId = document.organizationId;
    this.createdAt = document.createdAt;
    this.note = document.note;
    this.url = document.url;
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
    example: 'linkexample',
  })
  url: string;

  @ApiResponseProperty({
    type: String,
    example: 'ghi chu cho document',
  })
  note: string;

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

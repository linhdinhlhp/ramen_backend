import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';

import { Version } from 'src/db/entities/version.entity';

export class VersionResponseDto {
  constructor(version: Version) {
    this.id = version.id;
    this.versionId = version.versionId;
    this.versionName = version.versionName;
    this.created_by = version.created_by;
    this.documentId = version.documentId;
    this.createdAt = version.createdAt;
    this.note = version.note;
    this.downloadNumber = version.downloadNumber;
    this.url = version.url;
    this.type = version.type;
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
  versionId: string;

  @ApiResponseProperty({
    type: String,
    example: 'ABC123',
  })
  documentId: string;

  @ApiResponseProperty({
    type: String,
    example: 'abcxyz.txt',
  })
  versionName: string;

  @ApiResponseProperty({
    type: String,
    example: 'ghi chu cho document',
  })
  note: string;

  @ApiResponseProperty({
    type: Number,
    example: '',
  })
  downloadNumber: number;

  @ApiResponseProperty({
    type: String,
    example: 'link cloudinary',
  })
  url: string;

  @ApiResponseProperty({
    type: String,
    example: 'xlsx,pptx,..',
  })
  type: string;

  @ApiResponseProperty({
    type: String,
    example: 'ten nguoi',
  })
  created_by: string;

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

export class VersionResponseListDto {
  @ApiResponseProperty({
    type: [VersionResponseDto],
  })
  versions: VersionResponseDto[];

  @ApiResponseProperty({
    type: MetaData,
  })
  metadata: MetaData;
}

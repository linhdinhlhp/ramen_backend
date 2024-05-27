// import { document } from 'src/store/apps/document';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class CreateDocumentRequestDto {
  @ApiProperty({
    type: String,
    example: 'phieu giao nhiem vu',
    required: true,
  })
  @MaxLength(24)
  @IsNotEmpty()
  readonly document_name: string;

  @ApiProperty({
    type: String,
    example: 'Pay monthly internet bill',
    required: false,
  })
  @IsOptional()
  readonly note?: string;

  @ApiProperty({
    type: Date,
    example: '2024-02-26T07:31:35.000Z',
    required: true,
  })
  @IsNotEmpty()
  readonly createdAt: Date;
}

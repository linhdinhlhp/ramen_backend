// import { document } from 'src/store/apps/document';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class CreateVersionRequestDto {
  @ApiProperty({
    type: String,
    example: 'phieu giao nhiem vu',
    required: true,
  })
  @MaxLength(24)
  @IsNotEmpty()
  readonly versionName: string;

  // @ApiProperty({
  //   type: String,
  //   example: 'phieu giao nhiem vu',
  //   required: true,
  // })
  // @MaxLength(24)
  // @IsNotEmpty()
  // readonly documentId?: string;

  @ApiProperty({
    type: String,
    example: 'Link file',
    required: false,
  })
  @IsOptional()
  readonly url?: string;

  @ApiProperty({
    type: String,
    example: 'xlsx,docx,...',
    required: false,
  })
  @IsOptional()
  readonly type?: string;

  @ApiProperty({
    type: String,
    example: 'xlsx,docx,...',
    required: false,
  })
  @IsOptional()
  readonly created_by?: string;

  @ApiProperty({
    type: Date,
    example: '2024-02-26T07:31:35.000Z',
    required: true,
  })
  @IsNotEmpty()
  readonly createdAt: Date;

  @ApiProperty({
    type: String,
    example: 'Pay monthly internet bill',
    required: false,
  })
  @IsOptional()
  readonly note?: string;
}

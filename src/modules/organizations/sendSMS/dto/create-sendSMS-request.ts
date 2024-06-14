// import { document } from 'src/store/apps/document';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class CreateSendSMSRequestDto {
  @ApiProperty({
    type: Number,
    example: '84965563482',
    required: true,
  })
  documentId: number;

  @ApiProperty({
    type: String,
    example: 'TienND test thu nha',
    required: true,
  })
  @IsOptional()
  readonly content: string;

  @ApiProperty({
    type: Date,
    example: '2024-02-26T07:31:35.000Z',
    required: true,
  })
  @IsNotEmpty()
  readonly createdAt: Date;
}

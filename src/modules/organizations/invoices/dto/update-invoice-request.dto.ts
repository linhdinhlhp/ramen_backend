import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsOptional,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { CurrencyType, InvoiceType } from 'src/db/entities';

export class UpdateInvoiceItemRequest {
  @ApiProperty({
    type: String,
    example: 'Monthly bill',
    required: false,
  })
  @MaxLength(24)
  @IsOptional()
  readonly name?: string;

  @ApiProperty({
    type: String,
    example: 'Pay monthly internet bill',
    required: false,
  })
  @IsOptional()
  readonly note?: string;

  @ApiProperty({
    type: Number,
    example: 100000,
    required: false,
  })
  @IsOptional()
  readonly price?: number;

  @ApiProperty({
    type: Number,
    example: 1,
    required: false,
  })
  @IsOptional()
  readonly quantity?: number;

  @ApiProperty({
    type: InvoiceType,
    enum: InvoiceType,
    enumName: 'InvoiceType',
    example: InvoiceType.EXPENSE,
    required: false,
  })
  @IsOptional()
  readonly type?: InvoiceType;
}

export class UpdateInvoiceRequestDto {
  @ApiProperty({
    type: Date,
    example: '2024-02-26T07:31:35.000Z',
    required: false,
  })
  @IsOptional()
  readonly date?: Date;

  @ApiProperty({
    type: CurrencyType,
    enum: CurrencyType,
    enumName: 'CurrencyType',
    example: CurrencyType.VND,
    required: false,
  })
  @IsOptional()
  readonly currency?: CurrencyType;

  @ApiProperty({
    type: [UpdateInvoiceItemRequest],
  })
  @ValidateNested()
  @IsOptional()
  @IsArray()
  readonly items?: UpdateInvoiceItemRequest[];
}

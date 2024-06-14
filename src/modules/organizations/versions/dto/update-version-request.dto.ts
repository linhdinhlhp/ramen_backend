import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, MaxLength } from 'class-validator';

export class UpdateVerionRequestDto {
  @ApiProperty({
    type: String,
    example: 'phieu giao nhiem vu',
    required: false,
  })
  @MaxLength(24)
  @IsOptional()
  readonly versionName?: string;

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
    required: false,
  })
  @IsOptional()
  readonly createdAt?: Date;
}

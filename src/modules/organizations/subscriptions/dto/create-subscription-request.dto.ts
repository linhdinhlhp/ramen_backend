// import { document } from 'src/store/apps/document';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateSubscriptionsRequestDto {
  // @ApiProperty({
  //   type: Number,
  //   example: '12',
  //   required: true,
  // })
  // documentId: number;

  @ApiProperty({
    type: Boolean,
    example: 'true/false',
    required: true,
  })
  @IsOptional()
  readonly byEmail: boolean;

  @ApiProperty({
    type: Boolean,
    example: 'true/false',
    required: true,
  })
  @IsOptional()
  readonly bySMS: boolean;

  @ApiProperty({
    type: Date,
    example: '2024-02-26T07:31:35.000Z',
    required: true,
  })
  @IsNotEmpty()
  readonly createdAt: Date;
}

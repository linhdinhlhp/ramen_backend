// import { document } from 'src/store/apps/document';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateSubscriptionsRequestDto {
  // @ApiProperty({
  //   type: Number,
  //   example: 1,
  // })
  // id: number;

  @ApiProperty({
    type: Number,
    example: '12',
    required: true,
  })
  documentId: number;

  // @ApiProperty({
  //   type: Number,
  //   example: '123',
  // })
  // userId: number;

  @ApiProperty({
    type: Boolean,
    example: '0/1',
    required: true,
  })
  @IsBoolean()
  readonly byEmail: boolean;

  @ApiProperty({
    type: Boolean,
    example: '0/1',
    required: true,
  })
  @IsBoolean()
  readonly bySMS: boolean;

  @ApiProperty({
    type: String,
    example: '0123456789',
  })
  phone: string | null;

  @ApiProperty({
    type: String,
    example: 'fake@mail.com',
  })
  email: string | null;

  @ApiProperty({
    type: Date,
    example: '2024-02-26T07:31:35.000Z',
  })
  createdAt: Date;
}

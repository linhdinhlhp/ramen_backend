// import { document } from 'src/store/apps/document';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateSubscriptionsRequestDto {
  // @ApiProperty({
  //   type: Number,
  //   example: '12',
  //   required: true,
  // })
  // documentId: number;

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
}

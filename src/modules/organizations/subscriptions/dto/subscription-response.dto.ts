import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';
import { DocumentSubscription } from 'src/db/entities/subscription.entity';

export class SubscriptionsResponseDto {
  constructor(subscription: DocumentSubscription) {
    this.id = subscription.id;
    this.documentId = subscription.documentId;
    this.userId = subscription.userId;
    this.byEmail = subscription.byEmail;
    this.bySMS = subscription.bySMS;
    this.createdAt = subscription.createdAt;
    this.email = subscription.email;
    this.phone = subscription.phone;
  }

  @ApiResponseProperty({
    type: Number,
    example: 1,
  })
  id: number;

  @ApiResponseProperty({
    type: Number,
    example: '123',
  })
  documentId: number;

  @ApiResponseProperty({
    type: Number,
    example: '123',
  })
  userId: number;

  @ApiResponseProperty({
    type: Boolean,
    example: 'true/false',
  })
  @IsBoolean()
  bySMS: boolean;

  @ApiResponseProperty({
    type: Boolean,
    example: 'true/false',
  })
  @IsBoolean()
  byEmail: boolean;

  @ApiResponseProperty({
    type: String,
    example: 'fake@gmail.com',
  })
  email: string;

  @ApiResponseProperty({
    type: String,
    example: '123456789',
  })
  phone: string;

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

export class SubscriptionsResponseListDto {
  @ApiResponseProperty({
    type: [SubscriptionsResponseDto],
  })
  subscriptions: SubscriptionsResponseDto[];

  @ApiResponseProperty({
    type: MetaData,
  })
  metadata: MetaData;
}

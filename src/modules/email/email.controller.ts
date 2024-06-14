import { Controller, HttpStatus, Post } from '@nestjs/common';
import { EmailService, SendEmailDto } from './email.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

const notifications =
  '<b>Đây là version mới nhất của file bạn cần đó ạ <span </b>';
@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @ApiOperation({
    tags: ['Send email'],
    operationId: 'Send email of anoucements for users',
    summary: 'Send email of anoucements for users',
    description: 'Send email of anoucements for users',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    // type: VersionResponseListDto,
  })
  @Post('/send-email')
  sendEmail() {
    const dto: SendEmailDto = {
      sender: { name: 'HR', address: 'hr@example.com' },
      receivers: [{ name: 'john', address: 'john@example.com' }],
      subject: 'Do An ',
      text: 'Đây là version mới nhất của file bạn cần đó ạ',
      html: notifications,
    };
    return this.emailService.sendEmail(dto);
  }
}

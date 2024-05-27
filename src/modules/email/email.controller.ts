import { Controller, Post } from '@nestjs/common';
import { EmailService, SendEmailDto } from './email.service';

const notifications =
  '<b>Đây là version mới nhất của file bạn cần đó ạ <span </b>';
@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}
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

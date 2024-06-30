import { Controller, Post } from '@nestjs/common';
import { EmailService, SendEmailDto } from './email.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

const notifications =
  '<b>Đã có version mới nhất của biểu mẫu Đơn xin mở lớp bổ sung dành cho cá nhân <span style =" color: green;" >Đơn xin mở lớp bổ sung dành cho cá nhân</span></b>';
@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  // @ApiOperation({
  //   tags: ['Send email'],
  //   operationId: 'Send email of anoucements for users',
  //   summary: 'Send email of anoucements for users',
  //   description: 'Send email of anoucements for users',
  // })
  // @ApiResponse({
  //   status: HttpStatus.OK,
  //   // type: VersionResponseListDto,
  // })
  @Post('/send-email')
  sendEmail() {
    const dto: SendEmailDto = {
      sender: { name: 'noreply', address: 'noreply@example.com' },
      receivers: [{ name: 'Bao Anh', address: 'anh.lb194470@gmail.com' }],
      subject: 'LD_DVM ',
      text: 'Đây là version mới nhất của tài liệu  bạn cần đó ạ',
      html: '<b>Đã có version mới nhất của biểu mẫu Đơn xin mở lớp bổ sung dành cho cá nhân <span style =" color: green;" >Đơn xin mở lớp bổ sung dành cho cá nhân</span>. Mời bạn truy cập website để có thông tin mới nhất</b>',
    };
    return this.emailService.sendEmail(dto);
  }
}

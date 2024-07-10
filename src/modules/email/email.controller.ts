import { Controller, Post } from '@nestjs/common';
import { EmailService, SendEmailDto } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('/send-email')
  sendEmail() {
    const dto: SendEmailDto = {
      sender: { name: 'noreply', address: 'noreply@example.com' },
      receivers: [{ name: 'Bao Anh', address: 'loyalmire@gmail.com' }],
      subject: 'LD_DVM ',
      text: 'Đây là version mới nhất của tài liệu  bạn cần đó ạ',
      html: '<p><strong>[Ngày], [Tháng], [Năm]</strong></p><p>Kính gửi: [Họ và tên ứng viên]</p><p><strong>Chủ đề: Thư Mời Đi Làm và Thông Báo Trúng Tuyển</strong></p><p>Kính gửi anh/chị,</p><p>Chúng tôi xin chân thành gửi đến anh/chị lời chúc mừng vì đã trúng tuyển vào vị trí [vị trí công việc] tại [tên công ty]. Đội ngũ tuyển dụng của chúng tôi rất vui mừng khi được chào đón anh/chị vào đội ngũ làm việc của chúng tôi.</p><p><strong>Thông tin công việc:</strong></p><ul><li><strong>Vị trí công việc:</strong> [Vị trí công việc]</li><li><strong>Thời gian bắt đầu:</strong> [Ngày bắt đầu làm việc]</li></ul><p>Chúng tôi rất mong được hợp tác cùng anh/chị và tin rằng anh/chị sẽ đem lại những đóng góp quý báu cho công ty.</p><p><strong>Quy trình làm việc tiếp theo:</strong></p><ol><li><strong>Hợp đồng lao động:</strong> Xin anh/chị vui lòng chuẩn bị các giấy tờ liên quan để hoàn thành thủ tục hợp đồng lao động tại văn phòng công ty vào ngày bắt đầu làm việc.</li><li><strong>Thời gian và địa điểm:</strong> Anh/chị được yêu cầu có mặt tại văn phòng công ty vào lúc [giờ:phút] ngày [ngày/tháng/năm] để bắt đầu quá trình làm việc.</li></ol><p><strong>Liên hệ:</strong></p><p>Nếu anh/chị có bất kỳ câu hỏi hoặc cần thêm thông tin, xin vui lòng liên hệ với chúng tôi qua địa chỉ email [email công ty] hoặc số điện thoại [số điện thoại công ty].</p><p>Chân thành cảm ơn sự quan tâm và hy vọng sớm gặp lại anh/chị tại văn phòng công ty.</p><p>Trân trọng,</p><p>[Chữ ký của người gửi] [Tên của người gửi] [Tên công ty]</p>',
    };
    return this.emailService.sendEmail(dto);
  }
}

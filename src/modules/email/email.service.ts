
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Address } from '@nestjs-modules/mailer/dist/interfaces/send-mail-options.interface';

export type SendEmailDto={
    sender?: string |Address;
    receivers?:Address[];
    subject?: string;
    text?: string;
    html?: string;

}
@Injectable()
export class EmailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,   
  ) {}

  async sendEmail(dto: SendEmailDto ){
    const{receivers, subject, text, html }= dto;


    const sender: string | Address= dto.sender ?? {
        name: this.configService.get<string>('APP_NAME'),
        address: this.configService.get<string>('MAIL_SENDER'),
    };

    try {
        const result = await this.mailerService.sendMail({
            from: sender,
            to: receivers,
            subject,
            text,
            html,
    
        });
        return result;
    }
    catch (error){
        console.log('error: ', error);
    }
 
  }
}
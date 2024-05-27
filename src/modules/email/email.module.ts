import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';

@Module({
  imports: [
    MailerModule.forRootAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: async (ConfigService: ConfigService) => ({
        transport: {
          host: ConfigService.get<string>('MAIL_HOST'),
          port: ConfigService.get<string>('MAIL_PORT'),
          secure: false,
          auth: {
            user: ConfigService.get<string>('MAIL_USER'),
            pass: ConfigService.get<string>('MAIL_PASSWORD'),
          },
        },
        defaults: {
          from: ConfigService.get<string>('MAIL_SENDER'),
        },
      }),
    }),
  ],
  controllers: [EmailController],
  providers: [EmailService],
})
export class EmailModule {}

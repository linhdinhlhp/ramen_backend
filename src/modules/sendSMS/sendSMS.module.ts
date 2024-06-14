import { HttpModule } from '@nestjs/axios';
import { SendSMSService } from './sendSMS.service';
import { Module } from '@nestjs/common';
import { SendSMSController } from './sendSMS.controller';

@Module({
  imports: [HttpModule],
  providers: [SendSMSService],
  controllers: [SendSMSController],
})
export class SendSMSModule {}

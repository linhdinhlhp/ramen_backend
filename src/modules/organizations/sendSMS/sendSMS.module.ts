import { HttpModule } from '@nestjs/axios';
import { AuthzModule } from 'src/modules/authz/authz.module';
import { SendSMSService } from './sendSMS.service';
import { Module } from '@nestjs/common';
import { SendSMSController } from './sendSMS.controller';
import { MetadataScanner } from '@nestjs/core';

@Module({
  imports: [AuthzModule, HttpModule],
  providers: [MetadataScanner, SendSMSService],
  controllers: [SendSMSController],
})
export class SendSMSModule {}

import { Controller, Post } from '@nestjs/common';
import { SendSMSService, SendSMSDto } from './sendSMS.service';


@Controller('sms')
export class SendSMSController{
    constructor(private readonly sendSMSService: SendSMSService) { }
    @Post('/send-sms')
    sendSMS(){
        const dto: SendSMSDto = {
            phones: '84965563482',
            content: 'test thu nha',
            type: '2',
            sender: ''
                    }
        return this.sendSMSService.sendSMS(dto);
    }
}
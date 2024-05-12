import { HttpService } from "@nestjs/axios";
import {  Injectable } from "@nestjs/common";
import { AxiosResponse } from "axios";

export type SendSMSDto={
    phones?: string;
    content?: string;
    type?: string;
    sender?: string;

}
@Injectable()
export class SendSMSService {
  private readonly accessToken: string = process.env.TOKEN;
  constructor(private readonly httpService: HttpService) {}

  async sendSMS(dto: SendSMSDto): Promise<void> {
    const{phones, content, type, sender}= dto;
    const url = 'https://api.speedsms.vn/index.php/user/info?access-token=3OfhP1u285VQcuIGCvtDc6TAzvtbEmlP';
    const params = {
      to: phones,
      content: content,
      sms_type: type,
      sender: sender,
    };
    
    const auth = `Basic ${Buffer.from(`${this.accessToken}:x`).toString('base64')}`;
    
    try {
      const response: AxiosResponse<any> = await this.httpService.get(url, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': auth,
        },
      }).toPromise();
      // gui request tới url ở trên và trả về kết qủa về response 

      if (response.data.status === 'success') {
        console.log('send sms success');
        return response.data;
      } else {
        console.log('send sms failed', response.data);
      }
    } catch (error) {
      console.error('send sms failed:', error.message);
    }
  
}
}
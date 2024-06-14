import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { CreateSendSMSRequestDto } from './dto/create-sendSMS-request';
import { DocumentSubscription } from 'src/db/entities/subscription.entity';

export type SendSMSDto = {
  phones?: string;
  content?: string;
  type?: string;
  sender?: string;
};
@Injectable()
export class SendSMSService {
  private readonly accessToken: string = process.env.TOKEN;
  constructor(private readonly httpService: HttpService) {}

  async sendSMS(
    // documentId: number,
    request: CreateSendSMSRequestDto,
  ): Promise<void> {
    const url = 'hhttps://api.speedsms.vn/index.php/sms/send';

    const auth = `Basic ${Buffer.from(`${this.accessToken}:x`).toString(
      'base64',
    )}`;

    try {
      const response: AxiosResponse<any> = await this.httpService
        .get(url, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: auth,
          },
        })
        .toPromise();
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

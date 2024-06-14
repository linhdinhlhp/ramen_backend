import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { spawn } from 'child_process';
import fs from 'fs';

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

  async sendSMS(dto: SendSMSDto) {
    const { phones, content, type, sender } = dto;
    // // const params = {
    // //   to: phones,
    // //   content: content,
    // //   sms_type: type,
    // //   sender: sender,
    // };

    const auth = `Basic ${Buffer.from(`${this.accessToken}:x`).toString(
      'base64',
    )}`;

    try {
      //   const response: AxiosResponse<any> = await this.httpService.post(url, params, {
      //     headers: {
      //       'Content-Type': 'application/json',
      //       'Authorization': auth,
      //     },
      //   }).toPromise();
      const store = new fs.WriteStream();

      const curl = spawn('curl', [
        'https://api.speedsms.vn/index.php/user/info?access-token=3OfhP1u285VQcuIGCvtDc6TAzvtbEmlP',
      ]);

      curl.stdout
        .on('data', (data) => {
          console.log(`stdout: ${data}`);
          return data;
        })
        .pipe(store);

      curl.stderr.on('data', (data) => {
        console.log(`stderr: ${data}`);
      });

      curl.on('error', (error) => {
        console.log(`error: ${error.message}`);
      });

      curl.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
      });

      //   if (response.data.status === 'success') {
      //     console.log('send sms success');
      //   } else {
      //     console.log('send sms failed', response.data);
      //   }
      return store;
    } catch (error) {
      console.error('send sms failed:', error.message);
    }
  }
}

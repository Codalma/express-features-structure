import { Transporter } from 'nodemailer';
import { IEmail, IMailerService } from '@common/interfaces/';

export class NodeMailerLibrary implements IMailerService {
  private transporter: Transporter;
  constructor(transporter: Transporter) {
    this.transporter = transporter;
  }

  public async sendEmail(emailData: IEmail) {
    await this.transporter.sendMail(emailData);
  }
}

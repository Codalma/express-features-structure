import { IEmail, IMailerService } from '@infrastructure/interfaces/';
import { Transporter } from 'nodemailer';

export class NodeMailerLibrary implements IMailerService {
  private transporter: Transporter;
  constructor(transporter: Transporter) {
    this.transporter = transporter;
  }

  public async sendEmail(emailData: IEmail) {
    await this.transporter.sendMail(emailData);
  }
}

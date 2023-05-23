import { IEmail, IMailerService } from '@common/interfaces';

export class MailerService {
  private mailer: IMailerService;

  constructor(mailer: IMailerService) {
    this.mailer = mailer;
  }

  sendEmail(emailData: IEmail) {
    return this.mailer.sendEmail(emailData);
  }
}

import { IEmail, IMailerService } from '@infrastructure/interfaces';

export class MailerService {
  private mailer: IMailerService;

  constructor(mailer: IMailerService) {
    this.mailer = mailer;
  }

  sendEmail(emailData: IEmail) {
    return this.mailer.sendEmail(emailData);
  }
}

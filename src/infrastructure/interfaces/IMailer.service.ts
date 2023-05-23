export interface IEmail {
  from: string;
  to: string;
  subject: string;
  html?: string;
  text?: string;
  cc?: string[];
  bcc?: string[];
  attachments?: {
    filename: string;
    content: string;
  }[];
}

export interface IMailerService {
  sendEmail(emailData: IEmail): void;
}

import { Transporter } from 'nodemailer';
import { NodeMailerLibrary } from '@infrastructure/libraries';
import { IEmail, IMailerService } from '@infrastructure/interfaces';

describe('Scenario : Successfully send an email', () => {
  describe('Given the following email details', () => {
    describe('When sending this email with the nodemailer library', () => {
      test('Then it should be sent successfully', async () => {
        // Arrange
        const email: IEmail = {
          from: 'admin@company.com',
          to: 'johndoe@company.com',
          subject: 'Node mailer testing',
        };

        const transporterMock: Transporter = {
          sendMail: jest.fn(),
        } as unknown as Transporter;

        const nodemailer: IMailerService = new NodeMailerLibrary(
          transporterMock
        );

        // Act
        await nodemailer.sendEmail(email);

        // Assert
        expect(transporterMock.sendMail).toHaveBeenCalledTimes(1);
        expect(transporterMock.sendMail).toHaveBeenCalledWith(email);
      });
    });
  });
});

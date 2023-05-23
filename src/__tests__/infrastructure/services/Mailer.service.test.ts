import { MailerService } from '@infrastructure/services';
import { IEmail, IMailerService } from '@infrastructure/interfaces';
import { mailerServiceMock } from '@mocks/application/services/mailer.service.mock';

describe('Scenario : Mailer service tests suite', () => {
  describe('Given a Mailer service', () => {
    // Arrange
    const mailerService: IMailerService = new MailerService(mailerServiceMock);

    const email: IEmail = {
      from: 'sender',
      to: 'destination',
      subject: 'subject',
    };

    describe('When calling the sendEmail method with the email', () => {
      // Act
      mailerService.sendEmail(email);

      test('Then it should call the sendEmail method of the mailer with the email', () => {
        // Assert
        expect(mailerServiceMock.sendEmail).toHaveBeenCalledTimes(1);
        expect(mailerServiceMock.sendEmail).toHaveBeenCalledWith(email);
      });
    });
  });
});

import sgMail from '@sendgrid/mail';
import "dotenv/config";

const { SENDGRID_KEY } = process.env;
sgMail.setApiKey(SENDGRID_KEY);


function verificationEmail(email, verificationToken) {
  const msg = {
    to: "alabama.toj@gmail.com", 
    from: "alabama.toj@gmail.com",
    subject: 'Верифікація електронної пошти',
    text: 'Ваш токен для верифікації: ' + verificationToken,
    html: `<p>Ваш токен для верифікації: <strong>${verificationToken}</strong></p>`,
  };

  sgMail.send(msg)
    .then(() => {
      console.log(`Лист для верифікації відправлено на ${email}`);
    })
    .catch((error) => {
      console.error(`Помилка під час відправлення листа: ${error.message}`);
    });
}

export default verificationEmail;



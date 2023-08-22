import sgMail from '@sendgrid/mail';
import "dotenv/config";

const { SENDGRID_KEY, BASE_URL } = process.env;
sgMail.setApiKey(SENDGRID_KEY);


function verificationEmail(email, verificationToken) {
  const msg = {
    to: email, 
    from: "alabama.toj@gmail.com",
    subject: 'Verification',
    text: `Here is you verification ${BASE_URL}/users/verify/${verificationToken}`,
    html: `<p>Click <a href="${BASE_URL}/users/verify/${verificationToken}" target="_blank">here</a> to verify your email.</p>`,
  };

  sgMail.send(msg)
    .then(() => {
      console.log(`Verification sent on ${email}`);
    })
    .catch((error) => {
      console.error(`Помилка під час відправлення листа: ${error.message}`);
    });
}

export default verificationEmail;



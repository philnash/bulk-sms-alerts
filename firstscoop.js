const twilio = require('twilio')(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);
const body = 'Ice creams are coming!';
const number = process.env.MY_NUMBER;

twilio.messages
  .create({
    to: number,
    from: process.env.TWILIO_NUMBER,
    body: body
  })
  .then(message => {
    console.log(message.sid);
  })
  .catch(err => console.error(err));

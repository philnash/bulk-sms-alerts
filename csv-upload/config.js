module.exports = {
  twilio: {
    accountSid: process.env.TWILIO_ACCOUNT_SID,
    authToken: process.env.TWILIO_AUTH_TOKEN,
    phoneNumber: process.env.TWILIO_NUMBER,
    notifyServiceSid: process.env.TWILIO_NOTIFY_SERVICE_SID,
    messagingServiceSid: process.env.TWILIO_MESSAGING_SERVICE_SID
  },
  port: process.env.PORT || "3000"
}
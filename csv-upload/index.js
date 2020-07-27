const { join } = require("path");

const config = require("./config");
const csvParser = require("./lib/csvParser");

const express = require("express");
const twilio = require("twilio")(
  config.twilio.accountSid,
  config.twilio.authToken
);
const pino = require("pino")();
const logger = require("express-pino-logger")({
  logger: pino,
});

const service = twilio.notify.services(process.env.TWILIO_NOTIFY_SERVICE_SID);
const app = express();
app.use(logger);

app.use(express.static(join(__dirname, "public")));

app.post("/messages", async (req, res) => {
  try {
    const { records, fields } = await csvParser(req, "csv-upload");
    const body = fields["body"];
    const bindings = records.map((record) => {
      return JSON.stringify({ binding_type: "sms", address: record.Number });
    });
    await service.notifications.create({
      toBinding: bindings,
      body: body,
    });
    res.redirect("/");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(config.port, () => {
  pino.info(`Started server on http://localhost:${config.port}`);
});

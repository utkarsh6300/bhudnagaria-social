// Download the helper library from https://www.twilio.com/docs/node/install
// Set environment variables for your credentials
// Read more at http://twil.io/secure
const accountSid = "AC1aa86738ea4d4fc7f3db22b36fd091a0";
const authToken = process.env.TWILIO_AUTH_TOKEN||"6db2e502e1d9336bbdb850511d0c1df9";
const client = require("twilio")(accountSid, authToken);
const url="http://bhudnagaria.epizy.com"
client.messages
  .create({ body: `Hello from Twilio  ${url}`, from: "+12069445108", to: "+917300951279" })
  .then(message => console.log(message.sid));
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");

const PORT = process.env.PORT || 4500;
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authTOken = process.env.TWILIO_AUTH_TOKEN
require("dotenv").config();

app.use(bodyParser.urlencoded({ extended: true }));
const client = require("twilio")(accountSid, authTOken);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT} port`);
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
});

app.post("/", (req, res) => {
  // console.log(req.body.address);
  client.messages
    .create({
      to: "+919088720168",
      from: process.env.MY_TWILIO_NUMBER,
      body: `${req.body.address}`
    })
    .then((message) => console.log(message));
});

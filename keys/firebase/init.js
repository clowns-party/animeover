"use strict";
require("dotenv").config();
const fs = require("fs");
const path = require("path");
let config = {
  type: "service_account",
  project_id: "animeover-737d6",
  private_key_id: process.env.PRIVATE_KEY_ID,
  private_key: process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
  client_email:
    "firebase-adminsdk-qhtqn@animeover-737d6.iam.gserviceaccount.com",
  client_id: "107384258589034861298",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-qhtqn%40animeover-737d6.iam.gserviceaccount.com",
    universe_domain: "googleapis.com"
};

let data = JSON.stringify(config, null, 2);
fs.writeFile(path.join(__dirname, "", "admin.json"), data, (err) => {
  if (err) throw err;
  console.log("Admin SDK config file be created!");
});

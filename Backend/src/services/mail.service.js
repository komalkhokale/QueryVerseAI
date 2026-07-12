
// import dotenv from "dotenv";
// dotenv.config();

// import { google } from "googleapis";
// import nodemailer from "nodemailer";

// const oauth2Client = new google.auth.OAuth2(
//   process.env.GOOGLE_CLIENT_ID,
//   process.env.GOOGLE_CLIENT_SECRET,
//   "https://developers.google.com/oauthplayground",
// );

// oauth2Client.setCredentials({
//   refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
// });

// const accessToken = await oauth2Client.getAccessToken();

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     type: "OAuth2",
//     user: process.env.GOOGLE_USER,
//     clientId: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
//     accessToken: accessToken.token,
//   },

  
// });

// transporter
//   .verify()
//   .then(() => {
//     console.log("Email transporter is ready to send emails");
//   })
//   .catch((err) => {
//     console.error("Email transporter verification failed:", err);
//   });


//   export async function sendEmail({ to, subject, html, text }) {

//       console.log("CLIENT_ID:", process.env.GOOGLE_CLIENT_ID);
//       console.log("REFRESH_TOKEN:", process.env.GOOGLE_REFRESH_TOKEN);
//       console.log("USER:", process.env.GOOGLE_USER);

//     try {
//       const details = await transporter.sendMail({
//         from: process.env.GOOGLE_USER,
//         to,
//         subject,
//         html,
//         text,
//       });

    
//       console.log(details);
//     } catch (err) {
//       console.log("ERROR OBJECT:");
//       console.dir(err, { depth: null });
//     }
//   }


import dotenv from "dotenv";
dotenv.config();

import { google } from "googleapis";
import nodemailer from "nodemailer";

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "https://developers.google.com/oauthplayground",
);

oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

export async function sendEmail({ to, subject, html, text }) {
  try {
    const accessTokenResponse = await oauth2Client.getAccessToken();

    const accessToken =
      typeof accessTokenResponse === "string"
        ? accessTokenResponse
        : accessTokenResponse?.token;

    if (!accessToken) {
      throw new Error("Unable to generate Gmail access token");
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",

      auth: {
        type: "OAuth2",
        user: process.env.GOOGLE_USER,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
        accessToken,
      },
    });

    const details = await transporter.sendMail({
      from: `"QueryVerseAI" <${process.env.GOOGLE_USER}>`,
      to,
      subject,
      text,
      html,
    });

    console.log("Email sent successfully:", details.messageId);

    return details;
  } catch (error) {
    console.error("Email sending failed:", error.message);

    throw error;
  }
}
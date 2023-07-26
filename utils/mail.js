const nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: 'tiffy.learn@gmail.com', //Change to homionapp and set in environment variable
    pass: 'hfywcpcytvcwijop',
  },
});

var mailOptions = {
  from: 'Tiffy <tiffy.learn@gmail.com>',
};

exports.setMailOptions = (to, subject, html) => {
  mailOptions.to = to;
  mailOptions.subject = subject;
  mailOptions.html = html;
  console.log(mailOptions)
};

exports.sendMail = () => {
    console.log('sendMail');
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

exports.sendOTPMail = (firstName, lastName, otp) => {
  const mail = `
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
  </head>
  
  <body style="text-align: center; margin-top: 20px; font-family: Arial, Helvetica, sans-serif;">
    <h1 class="purple fw-bold" style="background-color:  rgb(245, 135, 0); color: white;padding: 10px 0px; margin-bottom: 20px;">
      ${process.env.APP_NAME}</h1>
    <h2>Welcome!</h2>
  
    <p style="font-size: 16px; margin-top: 20px;">Hello @ ${firstName} ${lastName}</p>
    <p style="font-size: 16px; color: gray;">You have successfully created a ${process.env.APP_NAME} account.</p>
    <p style="font-size: 16px;">Use <b>${otp}</b> as your OTP to signup. Never share your OTP with any unauthorized person. OTP is confidential and valid for 5 mins.</p>
  
    <p style="font-size: 16px; color: gray; margin-bottom: 7px; margin-top: 25px;">Thanks!!</p>
    <p style="font-size: 16px; color: gray; margin: 0;">The ${process.env.APP_NAME} Team</p>
  
  </body>
  </html>`;

  return mail;
};


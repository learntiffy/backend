const nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: 'tiffy.learn@gmail.com', //Change to homionapp and set in environment variable
    pass: 'hfywcpcytvcwijop',
  },
});

var mailOptions = {
  from: 'Tapauswa <tiffy.learn@gmail.com>',
};

exports.setMailOptions = (to, subject, html) => {
  mailOptions.to = to;
  mailOptions.subject = subject;
  mailOptions.html = html;
  console.log(mailOptions)
};

exports.sendMail = () => {
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
    <img
      src="https://res.cloudinary.com/duaqsz3ec/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1691229514/assets/Tapauswa_new_png_iorf3m.jpg?_s=public-apps"
      width="200"
      alt="Logo">
    <hr>
    <h2>Welcome</h2>

    <p style="font-size: 16px; margin-top: 20px;">Hello @ ${firstName} ${lastName}</p>
    <p style="font-size: 16px; color: gray;">You have successfully created a ${process.env.APP_NAME} account.</p>
    <p style="font-size: 16px;">Use <b>${otp}</b> as your OTP to signup. Never share your OTP with any unauthorized
      person. OTP is confidential and valid for 5 mins.</p>

    <p style="font-size: 16px; color: gray; margin-bottom: 7px; margin-top: 25px;">Thanks!!</p>

  </body>
  </html>`;

  return mail;
};


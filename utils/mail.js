const nodemailer = require("nodemailer");
const moment = require('moment');
const Meal = require("../data/Meal");
const ItemType = require("../data/ItemType");
const logger = require("./logger");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: 'tiffy.learn@gmail.com', //Change to homionapp and set in environment variable
    pass: 'hfywcpcytvcwijop',
  },
});

exports.sendMail = (to, subject, html) => {
  const mailOptions = {
    from: 'Tapauswa <tiffy.learn@gmail.com>',
    to: to,
    subject: subject,
    html: html
  };
  this.send(mailOptions);
};

exports.send = (mailOptions) => {
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      logger.error(error);
    } else {
      logger.info("Email sent");
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

exports.sendOrderMail = (order) => {
  const mealItems = [
    ...order.items.filter(item => ItemType.SABJI === ItemType[item.type]),
    ...order.items.filter(item => ItemType.ROTI === ItemType[item.type]),
    ...order.items.filter(item => ItemType.DAL === ItemType[item.type]),
    ...order.items.filter(item => ItemType.RICE === ItemType[item.type])
  ];
  const mealTotal = mealItems.reduce((total, curr) => { total += curr.price; return total; }, 0);
  const extraSpecialItems = [
    ...order.items.filter(item => ItemType.SPECIAL === ItemType[item.type]),
    ...order.items.filter(item => ItemType.EXTRA === ItemType[item.type])
  ];
  const mealItemsHtml = mealItems.reduce((items, item) => items += `<tr>
                                                                <td>${item.name}</td>
                                                                <td class="text-center">${item.unit}</td>
                                                                <td class="text-center">--</td>
                                                              </tr>`, '');
  const extraSpecialItemsHtml = extraSpecialItems.reduce((items, item) => items += `<tr>
                                                              <td>${item.name}</td>
                                                              <td class="text-center">${item.unit}</td>
                                                              <td class="text-center">&#8377; ${item.price}</td>
                                                            </tr>`, '');
  const address = order.address;
  const mail = `
  <html>
  <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <style>
          body {
              margin-top: 20px;
              font-family: Arial, Helvetica, sans-serif;
          }
          .text-center {
              text-align: center;
          }
          p {
              font-size: 14px;
              margin-top: 20px;
          }
          th, td {
              border: 1px solid gray;
          }
          table {
              width: 100%;
          }
      </style>
  </head>

  <body>
      <div class="text-center">
          <img src="https://res.cloudinary.com/duaqsz3ec/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1691229514/assets/Tapauswa_new_png_iorf3m.jpg?_s=public-apps"
              width="200" alt="Logo">
      </div><hr>

      <p>Thank you for your ${order.meal.toLowerCase()} order!</p>
      <p>Order Details <b>#${order._id.toString().toUpperCase()}</b></p>
      <p>Meal Date: ${moment(order.mealDate).format('MMMM Do YYYY')}</p>
      <div>
          <table>
              <thead>
                  <tr>
                      <th>Item</th>
                      <th>Qty</th>
                      <th>Amount</th>
                  </tr>
              </thead>
              <tbody>
                  ${mealItemsHtml}
                  <tr>
                      <td><b>SubTotal</b></td>
                      <td></td>
                      <td class="text-center"><b>&#8377; ${mealTotal}</b></td>
                  </tr>
                  ${extraSpecialItemsHtml}
                  <tr>
                      <td><b>Total</b></td>
                      <td></td>
                      <td class="text-center"><b>&#8377; ${order.amount}</b></td>
                  </tr>
              </tbody>
          </table>
      </div>

    <p><b>Address: </b> ${address.homeNo}, ${address.society}, ${address.landmark}, ${address.subArea.name}, ${address.area.name} - ${address.area.pincode}</p>
      <p>Order will be delivered to above address on ${moment(order.mealDate).format('MMMM Do YYYY')} by ${order.meal === Meal.LUNCH ? '01' : '07'} PM.</p>
      <p>Thank you for ordering at Tapauswa!</p>
      <hr>
      <p><b>Please Note: </b> This e-mail was sent from a notification-only address that cannot accept incoming e-mail.
          Please do not reply to this message.</p><br><br>

  </body>
  </html>`;

  return mail;
};

exports.sendOrderMailToAdmin = (order) => {
  const items = order.items.reduce((items, item) => items += `<tr>
                                                              <td>${item.name}</td>
                                                              <td class="text-center">${item.unit}</td>
                                                              <td class="text-center">&#8377; ${item.price}</td>
                                                            </tr>`, '');
  const address = order.address;
  const mail = `
  <html>
  <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <style>
          body {
              margin-top: 20px;
              font-family: Arial, Helvetica, sans-serif;
          }
          .text-center {
              text-align: center;
          }
          p {
              font-size: 14px;
              margin-top: 20px;
          }
          th, td {
              border: 1px solid gray;
          }
          table {
              width: 100%;
          }
      </style>
  </head>

  <body>
      <div class="text-center">
          <img src="https://res.cloudinary.com/duaqsz3ec/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1691229514/assets/Tapauswa_new_png_iorf3m.jpg?_s=public-apps"
              width="200" alt="Logo">
      </div><hr>

      <p>New ${order.meal.toLowerCase()} order!</p>
      <p>Order Details <b>#${order._id.toString().toUpperCase()}</b></p>
      <p>Meal Date: ${moment(order.mealDate).format('MMMM Do YYYY')}</p>
      <div>
          <table>
              <thead>
                  <tr>
                      <th>Item</th>
                      <th>Qty</th>
                      <th>Amount</th>
                  </tr>
              </thead>
              <tbody>
                  ${items}
                  <tr>
                      <td><b>Total</b></td>
                      <td></td>
                      <td class="text-center"><b>&#8377; ${order.amount}</b></td>
                  </tr>
              </tbody>
          </table>
      </div>
    <p><b>Address: </b> ${address.homeNo}, ${address.society}, ${address.landmark}, ${address.subArea.name}, ${address.area.name} - ${address.area.pincode}</p>
      <p>Order should be delivered to above address on ${moment(order.mealDate).format('MMMM Do YYYY')} by ${order.meal === Meal.LUNCH ? '01' : '07'} PM.</p>
      <hr>
  </body>
  </html>`;
  return mail;
};


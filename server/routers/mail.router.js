const express = require('express');
const router = express.Router();
const nodemailer = require("nodemailer");
require('dotenv');

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.post('/contact', async (req,res)=>{   
  const {name,subject,email,message} = req.body;

  try {
    const msg = {
      to: 'luketpena@gmail.com',
      from: email,
      subject: `${subject} FROM ${name}`,
      text: message,
      html: `<strong>${message}</strong>`,
    };
    await sgMail.send(msg);
    res.sendStatus(201);
  } catch (error) {
    console.log('Error sending contact email',error);
    
    res.sendStatus(400);
  }
});

/*
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
         user: 'luketpena@gmail.com',
         pass: '@zgar0th'
     }
 });

 router.post('/',(req,res)=>{   
   const letter = req.body;
 
   const mailOptions = {
     from: 'luketpena@gmail.com', // sender address
     to: letter.email, // list of receivers
     subject: 'New France Wine Account Information', // Subject line
     html: `<p>${'Hello, world'}</p>`// plain text body
   };
 
   transporter.sendMail(mailOptions, (err, info)=>{
      if (err) {
        console.log(err)
        res.sendStatus(400);
      } else {
        console.log(info);
        res.sendStatus(200);
      }
   });
 });

router.post('/contact',(req,res)=>{   
  const {name,subject,email,message} = req.body;

  const mailOptions = {
    from: email, // sender address
    to: 'luketpena@gmail.com', // list of receivers
    subject: `${subject} from ${name}`, // Subject line
    html: `<p>${message}</p>`// plain text body
  };

  transporter.sendMail(mailOptions, (err, info)=>{
     if (err) {
       console.log(err)
       res.sendStatus(400);
     } else {
       console.log(info);
       res.sendStatus(200);
     }
  });
});*/

module.exports = router;
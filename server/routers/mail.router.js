const express = require('express');
const pool = require('../modules/pool.js');
const router = express.Router();
const nodemailer = require("nodemailer");
const dotenv = require('dotenv');
dotenv.config();

const MAIL_KEY = process.env.SENDGRID_API_KEY;
const EMAIL = process.env.EMAIL;

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(MAIL_KEY);

router.post('/contact', async (req,res)=>{   
  const {name,subject,email,message} = req.body;
  try {
    const msg = {
      to: 'luketpena@gmail.com',
      from: email,
      subject: `${subject} FROM ${name}`,
      text: 'Text area',
      html: `<strong>${message}</strong>`,
    };
    await sgMail.send(msg);
    res.sendStatus(201);
  } catch (error) {
    console.log('Error sending contact email',error);
    
    res.sendStatus(400);
  }
});

router.post('/access', async (req,res)=>{   
  const {request, account_id} = req.body;
  try {

    const queryString = `SELECT * FROM "user" WHERE id=$1`;
    
    const result = await pool.query(queryString,[account_id]);

    const account_name = result.rows[0].username;
    const account_pass = result.rows[0].password_insecure;

    const message = `<div>
      <p>Your request for access to the Trade Portal at New France Wine has been approved.</p>
      <p>Here are the credentials for your account:</p>

      <p><strong>Username:</strong> ${account_name}</p>
      <p><strong>Password:</strong> ${account_pass}</p>
    </div>`

    //console.log('Access message:',message);
    

    const msg = {
      to: request.email,
      from: EMAIL,
      subject: `New France Wine account information`,
      text: 'Text area',
      html: message,
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
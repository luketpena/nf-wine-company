const express = require('express');
const router = express.Router();
const nodemailer = require("nodemailer");
require('dotenv');

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

module.exports = router;
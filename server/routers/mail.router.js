const express = require('express');
const pool = require('../modules/pool.js');
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();

const MAIL_KEY = process.env.SENDGRID_API_KEY;
const EMAIL = process.env.EMAIL;

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(MAIL_KEY);

router.post('/contact', async (req,res)=>{   
  const {name,subject,email,type,message} = req.body;
  console.log(EMAIL);
  
  try {
    const msg = {
      to: EMAIL,
      from: email,
      subject: `${type} - ${subject} from ${name}`,
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

router.post('/request', async (req,res)=>{   
  const {name, email, company} = req.body;
  
  try {
    const msg = {
      to: EMAIL,
      from: email,
      subject: `ACCESS REQUEST: ${name} from ${company}`,
      text: 'Text area',
      html: `<strong>${name} has requested trade portal access. You can view and approve their request from the Accounts page of the admin tools.</strong>`,
    };
    await sgMail.send(msg);
    res.sendStatus(201);
  } catch (error) {
    console.log('Error sending contact email',error);
    res.sendStatus(400);
  }
});

module.exports = router;
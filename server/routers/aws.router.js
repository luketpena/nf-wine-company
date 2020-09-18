const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();

const AWS_KEY_ID = process.env.AWS_KEY_ID || null;
const AWS_KEY = process.env.AWS_KEY || null;

// const fs = require('fs');
const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-2'})

const s3 = new AWS.S3({
  accessKeyId: AWS_KEY_ID,
  secretAccessKey: AWS_KEY
});

function uploadFile(file) {
  var uploadParams = {
    Bucket: 'ltpena-aws-spike',
    Key: 'newfile.pdf',
    Body: file.data
  };
  s3.upload (uploadParams, function(err,data) {
    if (err) {
      console.log('Error with AWS upload:', err);  
    } else {
      console.log('Upload Success!',data.location);
    }
  })
}

router.post('/upload', async (req,res)=>{
  try {
    const incomingFile = req.files.file;
    console.log('Incoming file:',incomingFile);
    uploadFile(incomingFile);
    res.sendStatus(200);
  } catch(error) {
    console.log('Error uploading to S3:',error);
    res.sendStatus(400);
  }
});

router.get('/download', async (req,res)=>{
  try {
    var params = {
      Bucket: 'ltpena-aws-spike',
      Key: 'newfile.pdf',
    };

    s3.getObject(params, function(err, data) {
      if (err) {
        console.log('Error!',err, err.stack); // an error occurred
        res.sendStatus(400);
      } else  {
        console.log('Success!',data);
        res.send(data.Body);
      } 
    });
  } catch(error) {
    console.log('Error downloading file:', error);
    res.sendStatus(400);
  }
 });

module.exports = router;
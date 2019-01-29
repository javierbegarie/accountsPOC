/**
 * Indirection server for avoiding browser's OPTION preflight requests. 
 */

const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('cors');
const axios = require('axios');

const upload = multer(); // for parsing multipart/form-data

const app = express()


var BASE_URL;

const ENDPOINTS = {
  authenticate: '/users/authenticate/'
}

process.argv.forEach((val, index, array)=>{
  if(val.includes('BASE_URL')){
    BASE_URL = val.split('=')[1];
    console.log('BASE_ULR',BASE_URL);
  } 
});

app.use(cors())
app.use(bodyParser.text()); // for parsing text/plain
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

app.post(ENDPOINTS.authenticate, upload.array() ,(uiRequest, uiResponse) => {

  let url = `${BASE_URL}${ENDPOINTS.authenticate}`;
  console.log('REQUEST URL', url, 'REQUEST BODY',uiRequest.body);
  axios.post(url, uiRequest.body)
  .then((res) => {
    console.log('OK',res.status,res.statusText,res.data);
    uiResponse.send(res.data);
  },(reason)=>{
    console.log('ERROR',reason.status,reason.statusText)
    uiResponse.status(reason.status).send(reason.statusText);
  });

});

app.listen(3000, function () {
  console.log('Indirection con port 3000');
});


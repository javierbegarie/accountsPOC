const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {getAccounts} = require('./mockDb');

const app = express()


app.use(cors())
app.use(bodyParser.text()); // for parsing text/plain
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/accounts', (req, res) => {
    res.send(getAccounts());
});

app.get('/reset', (req, res) => {
  res.send(getAccounts(true));
});

app.listen(3000, function () {
  console.log('Indirection con port 3000');
});


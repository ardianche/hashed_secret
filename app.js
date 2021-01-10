const express = require('express');
const app = express();
const router = express.Router();
const db = require('./db');
const secret = require('./routes/SecretRouter');
const port = process.env.PORT || 8080;
var cors = require('cors');

app.use(cors());

let bodyParser = require('body-parser')

app.use(bodyParser.json())

app.use(express.urlencoded({ extended: true }));
app.use('/api/secret', secret);

app.listen(port, function () {
  console.log('Example app listening on port 8080!')
})

const dotenv = require('dotenv');
dotenv.config();

var path = require('path');
const express = require('express');
var cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static('dist'));

apiRequest = require('./apiRequest');

const COUNTRIES_URL =
  'https://restcountries.eu/rest/v2/all?fields=name;alpha2Code';

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/dist/index.html');
});

app.listen(8081, function () {
  console.log('Server running on 8081');
});

app.get('/country', (req, res) => {
  apiRequest.getRequest(COUNTRIES_URL).then((response) => {
    if (response) {
      data = response.data;
      res.status(200).send({
        success: true,
        message: 'All countries',
        data,
      });
    } else {
      res.status(404).send({
        success: false,
        message: 'Countries service unavailable',
      });
    }
  });
});

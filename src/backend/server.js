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
apiDestination = require('./destination');

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

app.post('/destination', (req, res) => {
  const country = req.query.country;
  const ZP = req.query.ZP;
  const date = req.query.date;

  if (!country) {
    res.status(400).send({
      success: false,
      message: 'No destination country provided',
    });
    return;
  }

  if (!ZP) {
    res.status(400).send({
      success: false,
      message: 'No zip code provided',
    });
    return;
  }

  if (!date) {
    res.status(400).send({
      success: false,
      message: 'No travel date provided',
    });
    return;
  }

  apiDestination
    .getLatLon(ZP, country)
    .then((data) => {
      const { lat, lng, placeName } = data;
      if (apiDestination.isWithinWeek(date)) {
        console.log('Dentro de semana');
      } else {
        console.log('Fuera de semana');
      }
      res.status(200).send({
        success: true,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(404).send({
        success: false,
        message: 'No destination found',
      });
    });
});

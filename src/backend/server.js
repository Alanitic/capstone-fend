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

app.post('/destination', async (req, res) => {
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
  // Retrieving the coordinates of the given place
  const { lat, lng, placeName } = await apiDestination.getLatLon(ZP, country);
  // Fetching data weather of the given coordinates
  const { data: forecast } = await apiDestination.getWeatherForecast(lat, lng);
  if (apiDestination.isWithinWeek(date)) {
    const destination = forecast.find((item) => item.valid_date === date);
    // If the given date is in the past destination will be null
    if (!destination) {
      res.status(404).send({
        success: false,
        nessage: 'No destination found with given criteria',
      });
      return;
    }
    const results = await apiDestination.getDestinationImg(placeName, 3);
    const { webformatURL: img } = results[0];
    const {
      low_temp,
      max_temp,
      temp,
      weather: { description },
    } = destination;
    res.status(200).send({
      success: true,
      data: {
        low_temp,
        max_temp,
        temp,
        placeName,
        description,
        img,
      },
    });
  } else {
  }
});

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
/*
====================================================================
Country
====================================================================
 */
app.get('/country', (req, res) => {
  apiRequest.getRequest(COUNTRIES_URL).then((response) => {
    if (response) {
      data = response.data;
      sendResponse(
        res,
        200,
        true,
        'Retrieving all countries in the world',
        data
      );
    } else {
      sendResponse(res, 404, false, 'Countries service unavailable', null);
    }
  });
});
/*
====================================================================
Coordinates
====================================================================
 */
app.post('/coordinates', async (req, res) => {
  const country = req.query.country;
  const ZP = req.query.ZP;
  if (!country) {
    sendResponse(res, 400, false, 'No destination country provided', null);
    return;
  }

  if (!ZP) {
    sendResponse(res, 400, false, 'No zip code provided', null);
    return;
  }

  // Retrieving the coordinates of the given place
  try {
    const { lat, lng, placeName } = await apiDestination.getLatLon(ZP, country);
    const data = {
      lat,
      lng,
      placeName,
    };
    sendResponse(res, 200, true, 'Retrieving coordinates and placename', data);
  } catch (error) {
    sendResponse(res, 404, false, 'No data found with given criteria', null);
  }
});

/*
====================================================================
Forecast
====================================================================
 */

app.post('/forecast', async (req, res) => {
  const lat = req.query.lat;
  const lng = req.query.lng;
  const date = req.query.date;

  if (!lat) {
    sendResponse(res, 400, false, 'No latitud provided', null);
    return;
  }

  if (!lng) {
    sendResponse(res, 400, false, 'No longitud provided', null);
    return;
  }

  if (!date) {
    sendResponse(res, 400, false, 'No date provided', null);
    return;
  }

  const { data: forecast } = await apiDestination.getWeatherForecast(lat, lng);

  if (!forecast) {
    sendResponse(res, 404, 'No destination found with given criteria', null);
    return;
  }

  if (apiDestination.isWithinWeek(date)) {
    const destination = forecast.find((item) => item.valid_date === date);
    if (!destination) {
      sendResponse(
        res,
        404,
        false,
        'No destination found with given criteria',
        null
      );
      return;
    }
    const {
      low_temp,
      max_temp,
      temp,
      weather: { description },
    } = destination;
    const data = { low_temp, max_temp, temp, description };
    sendResponse(res, 200, true, 'Forecast of the given date(s)', data);
  } else {
  }
});

/*
====================================================================
Destination Image
====================================================================
 */

app.post('/destinationImg', async (req, res) => {
  const placeName = req.query.placeName;
  const nImages = req.query.nImages || 3;
  if (!placeName) {
    sendResponse(res, 400, false, 'No place name provided', null);
    return;
  }
  const results = await apiDestination.getDestinationImg(placeName, nImages);
  const data = results.map(({ webformatURL }) => webformatURL);
  sendResponse(res, 200, true, 'Images of the provided place', data);
});

/*
====================================================================
General functions
====================================================================
 */

const sendResponse = (res, status, success, message, data) => {
  res.status(status).send({
    success,
    message,
    data,
  });
};

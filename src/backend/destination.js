const MAX_ROWS = 10;
const USER_NAME = 'alan_islas_itic';
const WEATHER_API_KEY = 'a16ab59908364102890e0d53be290aa1';

const apiRequest = require('./apiRequest');

const getLatLon = async (ZP, country) => {
  const url = `http://api.geonames.org/postalCodeSearchJSON?postalcode=${ZP}&maxRows=${MAX_ROWS}&username=${USER_NAME}&country=${country}`;
  const { data } = await apiRequest.getRequest(url);
  const { lat, lng, placeName } = data.postalCodes[0];
  return { lat, lng, placeName };
};

const getWeatherForecast = async () => {
  const url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHER_API_KEY}&lat=${lat}&lon=${lng}`;
  const { data } = await apiRequest.getRequest(url);
  return data;
};

exports.getLatLon = getLatLon;

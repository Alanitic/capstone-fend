const MAX_ROWS = 10;
const USER_NAME = 'alan_islas_itic';
const WEATHER_API_KEY = 'a16ab59908364102890e0d53be290aa1';
const PIXABAY_KEY = '7052805-c3a2de3d1e6a0eeb52e7f68eb';
const CATEGORY = 'travel';

const apiRequest = require('./apiRequest');

const getLatLon = async (ZP, country) => {
  const url = `http://api.geonames.org/postalCodeSearchJSON?postalcode=${ZP}&maxRows=${MAX_ROWS}&username=${USER_NAME}&country=${country}`;
  const { data } = await apiRequest.getRequest(url);
  const { lat, lng, placeName } = data.postalCodes[0];
  return { lat, lng, placeName };
};

const getWeatherForecast = async (lat, lng) => {
  const url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHER_API_KEY}&lat=${lat}&lon=${lng}`;
  const { data } = await apiRequest.getRequest(url);
  return data;
};

const getDestinationImg = async (place, per_page) => {
  const url = `https://pixabay.com/api/?key=${PIXABAY_KEY}&q=${place}&per_page=${per_page}&category=${CATEGORY}`;
  const {
    data: { hits },
  } = await apiRequest.getRequest(url);
  return hits;
};

/**
 * Determines if the given date is within the next 7 days
 * @param {string} dateStr
 * @returns
 */
const isWithinWeek = (dateStr) => {
  const date = toDate(dateStr);
  const compare = new Date();
  compare.setDate(compare.getDate() + 7);
  if (compare > date) {
    return true;
  } else {
    return false;
  }
};

/**
 * converts the given string to date
 * @param {string} dateStr
 * @returns {date}
 */
const toDate = (dateStr) => {
  const [year, month, day] = dateStr.split('-');
  return new Date(year, month - 1, day);
};

module.exports = {
  getLatLon,
  getWeatherForecast,
  isWithinWeek,
  getDestinationImg,
};

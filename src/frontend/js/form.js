const PIXABAY_KEY = '7052805-c3a2de3d1e6a0eeb52e7f68eb';

const handleSubmit = (e) => {
  e.preventDefault();
  if (validateZP() && validateDate()) {
    fetchWeather();
  }
};

const fetchWeather = async () => {
  const { lat, lng, placeName } = await getLatLon();
  const response = await fetch(
    `https://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHER_API_KEY}&lat=${lat}&lon=${lng}`
  );
  const { data } = await response.json();
  if (isWithinWeek()) {
    const date = document.querySelector('#date');
    const expected = data.find((item) => item.datetime === date.value);
    createSingleCard(expected, placeName);
  } else {
  }
};

const createSingleCard = (data, place) => {
  const container = document.querySelector('#weather-results');
  const card = document.createElement('div');
  card.classList.add('card');
};

const getLatLon = async () => {
  const ZP = document.querySelector('#zp').value;
  const country = document.querySelector('#country').value;
  const request = await fetch(
    `http://api.geonames.org/postalCodeSearchJSON?postalcode=${ZP}&maxRows=${MAX_ROWS}&username=${USER_NAME}&country=${country}`
  );
  const { postalCodes } = await request.json();
  const { lat, lng, placeName } = postalCodes[0];
  return { lat, lng, placeName };
};

const isWithinWeek = () => {
  const calendar = document.querySelector('#date');
  const date = toDate(calendar.value);
  const compare = new Date();
  compare.setDate(compare.getDate() + 7);
  if (compare > date) {
    return true;
  } else {
    return false;
  }
};

const validateZP = () => {
  const ZP = document.querySelector('#zp');
  if (ZP.value === null || ZP.value.length === 0) {
    toggleErrorMsg(true, 'Please provide a Zip Code');
    return false;
  } else {
    toggleErrorMsg(false);
    return true;
  }
};

const validateDate = () => {
  const calendar = document.querySelector('#date');
  if (calendar.value === '') {
    toggleErrorMsg(true, 'Please provide a date');
    return false;
  }
  const date = toDate(calendar.value);
  const today = new Date();
  if (date.setHours(0, 0, 0, 0) < today.setHours(0, 0, 0, 0)) {
    toggleErrorMsg(true, 'Invalid date');
    return false;
  } else {
    toggleErrorMsg(false);
    return true;
  }
};

const toDate = (dateStr) => {
  const [year, month, day] = dateStr.split('-');
  return new Date(year, month - 1, day);
};

const toggleErrorMsg = (isVisible, msg = '') => {
  const section = document.querySelector('.error-form');
  const error = document.querySelector('#error-msg');
  if (isVisible) {
    section.classList.remove('hidden');
    error.innerHTML = msg;
  } else {
    section.classList.add('hidden');
  }
};

export { handleSubmit };

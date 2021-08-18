const MAX_ROWS = 10;
const USER_NAME = 'alan_islas_itic';
const API_KEY = 'a16ab59908364102890e0d53be290aa1';

const handleSubmit = (e) => {
  e.preventDefault();
  if (validateZP() && validateDate()) {
    fetchWeather();
  }
};

const fetchWeather = async () => {
  const { lat, lng } = await getLatLon();
  const response = await fetch(
    `https://api.weatherbit.io/v2.0/forecast/daily?key=${API_KEY}&lat=${lat}&lon=${lng}`
  );
  const data = await response.json();
  console.log(data.data);
  if (isWithinWeek()) {
  } else {
  }
};

const getLatLon = async () => {
  const ZP = document.querySelector('#zp').value;
  const country = document.querySelector('#country').value;
  const request = await fetch(
    `http://api.geonames.org/postalCodeSearchJSON?postalcode=${ZP}&maxRows=${MAX_ROWS}&username=${USER_NAME}&country=${country}`
  );
  const { postalCodes } = await request.json();
  const { lat, lng } = postalCodes[0];
  return { lat, lng };
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

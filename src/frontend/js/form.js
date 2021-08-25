import { postRequest } from './serverRequest';

const handleSubmit = (e) => {
  e.preventDefault();
  if (validateZP() && validateDate()) {
    fetchWeather();
  }
};

const fetchWeather = async () => {
  const country = document.querySelector('#country').value;
  const zp = document.querySelector('#zp').value;
  const date = document.querySelector('#date').value;
  const { success, data, message } = await postRequest(
    `http://localhost:8081/destination/?country=${country}&ZP=${zp}&date=${date}`
  );
  if (success) {
  } else {
    toggleErrorMsg(true, message);
  }
};

const createSingleCard = (data, place) => {
  const container = document.querySelector('#weather-results');
  const card = document.createElement('div');
  card.classList.add('card');
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

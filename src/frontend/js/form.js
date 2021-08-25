import { postRequest } from './serverRequest';

const handleSubmit = (e) => {
  e.preventDefault();
  // Reset error message
  toggleErrorMsg(false);
  // Retrieving UI data
  const { country, zp, dateStr } = getUIData();
  // Validating zip code
  if (!validateZP(zp)) {
    toggleErrorMsg(true, 'Please provide a Zip Code');
    return;
  }
  // Validating date
  if (!validateDate(dateStr)) {
    toggleErrorMsg(true, 'Please provide a valid date');
  }
  // Making requests
  makePostRequests(country, zp, dateStr)
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      toggleErrorMsg(true, error);
    });
};

const getUIData = () => {
  const country = document.querySelector('#country').value;
  const zp = document.querySelector('#zp').value;
  const dateStr = document.querySelector('#date').value;
  return { country, zp, dateStr };
};

const makePostRequests = async (country, zp, dateStr) => {
  const { lat, lng, placeName } = await postRequest(
    `http://localhost:8081/coordinates?country=${country}&ZP=${zp}`
  );
  const forecast = await postRequest(
    `http://localhost:8081/forecast?lat=${lat}&lng=${lng}&date=${dateStr}`
  );
  const images = await postRequest(
    `http://localhost:8081/destination-img?placeName=${placeName}&n_img=&${3}`
  );
  return {
    placeName,
    lat,
    lng,
    forecast,
    images,
  };
};

const createSingleCard = (data, place) => {
  const container = document.querySelector('#weather-results');
  const card = document.createElement('div');
  card.classList.add('card');
};

const validateZP = (zp) => {
  if (zp === null || zp.length === 0) {
    return false;
  } else {
    return true;
  }
};

const validateDate = (dateStr) => {
  if (dateStr === '') {
    return false;
  }
  const date = toDate(dateStr);
  const today = new Date();
  if (date.setHours(0, 0, 0, 0) < today.setHours(0, 0, 0, 0)) {
    return false;
  } else {
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

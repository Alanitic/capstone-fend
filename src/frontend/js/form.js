import { postRequest } from './serverRequest';
import { clearUI, getUIData, toggleErrorMsg, createCardSection } from './ui';

const handleSubmit = (e) => {
  e.preventDefault();
  // Reset error message
  toggleErrorMsg(false);
  // Reset content
  clearUI();
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
      createCardSection(result);
    })
    .catch((error) => {
      toggleErrorMsg(true, error);
    });
};

const makePostRequests = async (country, zp, dateStr) => {
  const { lat, lng, placeName } = await postRequest(
    `http://localhost:8081/coordinates?country=${country}&ZP=${zp}`
  );
  const forecast = await postRequest(
    `http://localhost:8081/forecast?lat=${lat}&lng=${lng}&date=${dateStr}`
  );
  let nImages = 0;
  if (forecast.length === 1) {
    nImages = 3;
  } else {
    nImages = 16;
  }
  const images = await postRequest(
    `http://localhost:8081/destination-img?placeName=${placeName}&n_img=${nImages}`
  );
  return {
    placeName,
    lat,
    lng,
    forecast,
    images,
  };
};

/**
 * Validates if there is an existing zip code
 * @param {string} zp
 * @returns {boolean} zip code valid
 */
const validateZP = (zp) => {
  if (zp === null || zp.length === 0) {
    return false;
  } else {
    return true;
  }
};

/**
 * Determines if there is an input date and is greater than today
 * @param {string} dateStr
 * @returns {boolean} whether the provided date is valid or not
 */
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

/**
 * Parses given date in string format to Date
 * @param {string} dateStr
 * @returns {Date} Date parsed
 */
const toDate = (dateStr) => {
  const [year, month, day] = dateStr.split('-');
  return new Date(year, month - 1, day);
};

export { handleSubmit };

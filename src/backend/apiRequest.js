const axios = require('axios');

const getRequest = async (url = '') => {
  return await axios.get(url).catch((error) => {
    console.log(error);
  });
};

exports.getRequest = getRequest;

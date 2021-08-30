const axios = require('axios');

const getRequest = async (url = '') => {
  const { data } = await axios.get(url);
  return data;
};

const postRequest = async (url) => {
  const { data } = await axios.post(url);
  if (data.success) {
    const { data: resp } = data;
    return resp;
  } else {
    throw new Error(jsonRes.message);
  }
};

export { getRequest, postRequest };

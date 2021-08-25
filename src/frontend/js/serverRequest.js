const getRequest = async (url = '') => {
  const request = await fetch(url);
  return await request.json();
};

const postRequest = async (url) => {
  const response = await fetch(url, {
    method: 'POST',
  });
  const jsonRes = await response.json();
  if (jsonRes.success) {
    const { data } = jsonRes;
    return data;
  } else {
    throw new Error(jsonRes.message);
  }
};

export { getRequest, postRequest };

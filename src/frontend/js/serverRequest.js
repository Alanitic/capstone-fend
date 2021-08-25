const getRequest = async (url = '') => {
  const request = await fetch(url);
  return await request.json();
};

const postRequest = async (url) => {
  const res = await fetch(url, {
    method: 'POST',
  });
  return await res.json();
};

export { getRequest, postRequest };

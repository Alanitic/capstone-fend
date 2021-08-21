const getRequest = async (url = '') => {
  const request = await fetch(url);
  return await request.json();
};

const postRequest = async (url) => {
  const respomse = await fetch(url, {
    method: 'POST',
  });
};

export { getRequest, postRequest };

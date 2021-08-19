const getRequest = async (url = '') => {
  const request = await fetch(url);
  return await request.json();
};

export { getRequest };

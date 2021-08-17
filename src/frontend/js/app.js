const LoadCountries = async () => {
  const request = await fetch(
    'https://restcountries.eu/rest/v2/all?fields=name;alpha2Code'
  );
  try {
    const allData = await request.json();
    const combo = document.querySelector('#country');
    const fragment = document.createDocumentFragment();
    for (let item of allData) {
      let option = document.createElement('option');
      option.innerHTML = item.name;
      option.value = item.alpha2Code;
      fragment.appendChild(option);
    }
    combo.appendChild(fragment);
  } catch (error) {
    console.log('error', error);
  }
};

export { LoadCountries };

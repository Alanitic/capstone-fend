import { getRequest } from './serverRequest';

const LoadCountries = async () => {
  const allData = await getRequest('http://localhost:8081/country');
  const combo = document.querySelector('#country');
  const fragment = document.createDocumentFragment();
  for (let item of allData.data) {
    let option = document.createElement('option');
    option.innerHTML = item.name;
    option.value = item.alpha2Code;
    fragment.appendChild(option);
  }
  combo.appendChild(fragment);
};

export { LoadCountries };

const getUIData = () => {
  const country = document.querySelector('#country').value;
  const zp = document.querySelector('#zp').value;
  const dateStr = document.querySelector('#date').value;
  return { country, zp, dateStr };
};

const createCardSection = (data) => {
  const title = document.querySelector('#destination');
  title.textContent = data.placeName;
  const container = document.querySelector('#weather-results');
  const content = createCards(data);
  container.appendChild(content);
};

const createCards = (content) => {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < content.forecast.length; i++) {
    // Creating the card
    const card = document.createElement('div');
    card.classList.add('card');
    // Creating the image
    const img = document.createElement('img');
    img.src = content.images[i];
    // Creating the title
    const title = document.createElement('h3');
    title.innerText = content.forecast[i].valid_date;
    // Creating the info
    const info = document.createElement('p');
    const infoStr = `Current temperature: ${content.forecast[i].temp}ºC
      Minimum temperature: ${content.forecast[i].low_temp}ºC
      Maximun temperature: ${content.forecast[i].max_temp}ºC
      Wheather: ${content.forecast[i].description}`;
    info.innerText = infoStr;
    // Inserting into the fragment
    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(info);
    fragment.appendChild(card);
  }
  return fragment;
};

const clearUI = () => {
  const title = document.querySelector('#destination');
  const container = document.querySelector('#weather-results');
  title.innerText = '';
  container.innerHTML = '';
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

export { getUIData, createCardSection, clearUI, toggleErrorMsg };

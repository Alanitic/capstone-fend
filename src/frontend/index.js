import './styles/style.scss';
import './styles/medium-size.scss';
import './styles/large-size.scss';

import { LoadCountries } from './js/app';
import { handleSubmit } from './js/form';

LoadCountries();

export { LoadCountries, handleSubmit };

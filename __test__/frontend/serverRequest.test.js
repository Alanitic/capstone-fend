import 'regenerator-runtime/runtime';

import { getRequest, postRequest } from '../../src/frontend/js/serverRequest';

describe('Fetching data to backend', () => {
  test('should return valid coordinates from NY', async () => {
    const country = 'US';
    const zp = 1019;
    const result = await getRequest(
      `http://localhost:8081/coordinates?country=${country}&ZP=${zp}`
    );
    console.log(result);
  });
});

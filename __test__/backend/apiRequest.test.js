import { getRequest } from '../../src/backend/apiRequest';

describe('Validate fetching third-party API', () => {
  test('should return data from MX', async () => {
    const { data } = await getRequest(
      'https://restcountries.eu/rest/v2/alpha/mx'
    );
    expect(data).not.toBeNull();
    expect(data.name).toBe('Mexico');
  });
});

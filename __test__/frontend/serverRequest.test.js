import { postRequest } from '../../src/frontend/js/serverRequest';

describe('Fetching data to backend', () => {
  test('should return valid coordinates from NY', async () => {
    const country = 'US';
    const zp = 10019;
    const { lat, lng, placeName } = await postRequest(
      `http://localhost:8081/coordinates?country=${country}&ZP=${zp}`
    );
    expect(typeof lat).toBe('number');
    expect(typeof lng).toBe('number');
    expect(placeName).not.toBeNull();
  });
});

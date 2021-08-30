import {
  getLatLon,
  getWeatherForecast,
  isWithinWeek,
  getDestinationImg,
} from '../../src/backend/destination';

describe('Fetching travel data and validating response', () => {
  test('should successfuly return valid coordinates', async () => {
    const res = await getLatLon(10019, 'US');
    expect(res).not.toBeNull();
    expect(res.placeName).toBe('New York');
  });

  test('should throw an exception', async () => {
    await expect(getLatLon(1019, 'US')).rejects.toThrow(Error);
  });

  test('should succesfuly return forecast information', async () => {
    const lat = 40.765069,
      lng = -73.985834;
    const { data } = await getWeatherForecast(lat, lng);
    expect(data).not.toBeNull();
    expect(data.length > 0).toBeTruthy();
  });

  test('should throw an exception', async () => {
    const lat = null,
      lng = null;
    await expect(getWeatherForecast(lat, lng)).rejects.toThrow(Error);
  });

  test('should return that the given input is within the week', () => {
    const today = new Date().toISOString().slice(0, 10);
    const result = isWithinWeek(today);
    expect(result).toBeTruthy();
  });

  test('should return that the given input is more than a week', () => {
    const date = new Date();
    date.setDate(date.getDate() + 8);
    const dateStr = date.toISOString().slice(0, 10);
    const result = isWithinWeek(dateStr);
    expect(result).not.toBeTruthy();
  });

  test('should return 3 images', async () => {
    const result = await getDestinationImg('New York', 3);
    expect(result).not.toBeNull();
    expect(result.length === 3).toBeTruthy();
  });

  test('should return 10 images', async () => {
    const result = await getDestinationImg('New York', 10);
    expect(result).not.toBeNull();
    expect(result.length === 10).toBeTruthy();
  });

  test('should thrown error because no image were found', async () => {
    await expect(
      getDestinationImg('asdkasdjlkasjdklasjdlkas', 0)
    ).rejects.toThrow(Error);
  });
});

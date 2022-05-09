import API from "../API";
import APIList from "./APIList";
import APIListDeviceTime from "./APIListDeviceTime";
import APIResourceUser from "./APIResourceUser";

describe('APIListDeviceTime', () => {
  const cloudUrl = 'https://cloud.bitbar.com';
  let service: APIListDeviceTime;

  beforeEach(() => {
    const api = new API({
      baseURL: '',
      cloudUrl
    });
    const parent = new APIResourceUser(api, 'me');

    service = new APIListDeviceTime(parent);
  });

  it('should initialize proper endpoint path', () => {
    expect(service.toUrl()).toEqual('/me/device-time');
  });

  describe('@reserved', () => {
    it('should initialize proper endpoint path', () => {
      const result = service.reserved();
      expect(result.toUrl()).toEqual('/me/device-time/reserved');
      expect(result).toBeInstanceOf(APIList);
    });
  });

  describe('@used', () => {
    it('should initialize proper endpoint path', () => {
      const result = service.used();
      expect(result.toUrl()).toEqual('/me/device-time/used');
      expect(result).toBeInstanceOf(APIList);
    });
  });
});

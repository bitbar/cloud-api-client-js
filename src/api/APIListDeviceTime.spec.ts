import {API} from '../API';
import {APIEntity} from './APIEntity';
import {APIListDeviceTime} from './APIListDeviceTime';
import {APIResourceUser} from './APIResourceUser';

describe('APIListDeviceTime', () => {
  const cloudUrl = 'https://cloud.bitbar.com';
  let service: APIListDeviceTime;
  const baseUrl = '/me/device-time';

  beforeEach(() => {
    const api = new API({
      baseURL: '',
      cloudUrl
    });
    const parent = new APIResourceUser(api, 'me');

    service = new APIListDeviceTime(parent);
  });

  it('should initialize proper endpoint path', () => {
    expect(service.toUrl()).toEqual(`${baseUrl}`);
  });

  describe('@reserved', () => {
    it('should initialize proper endpoint path', () => {
      const result = service.reserved();
      expect(result.toUrl()).toEqual(`${baseUrl}/reserved`);
      expect(result).toBeInstanceOf(APIEntity);
    });
  });

  describe('@used', () => {
    it('should initialize proper endpoint path', () => {
      const result = service.used();
      expect(result.toUrl()).toEqual(`${baseUrl}/used`);
      expect(result).toBeInstanceOf(APIEntity);
    });
  });
});

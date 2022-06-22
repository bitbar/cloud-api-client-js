import {API} from "../API";
import {APIResourceDevice} from "./APIResourceDevice";
import {APIList} from "./APIList";


describe('APIResourceDevice', () => {
  const cloudUrl = 'https://cloud.bitbar.com';
  let service: APIResourceDevice;
  let api: API;

  beforeEach(() => {
    api = new API({
      baseURL: '',
      cloudUrl
    });
    service = new APIResourceDevice(api, 1);
  });

  it('should initialize proper endpoint path', () => {
    expect(service.toUrl()).toEqual('/devices/1');
  });

  it('should throw error if resource ID is missing', () => {
    expect(() => new APIResourceDevice(api, null as any)).toThrow(new Error('Resource ID cannot be null!'));
  });

  describe('@properties', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.properties();
      expect(call).toBeInstanceOf(APIList);
      expect(call.toUrl()).toEqual('/devices/1/properties');
    });
  });

});

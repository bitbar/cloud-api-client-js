import {API} from "../API";
import {APIResourceCleanupConfiguration} from "./APIResourceCleanupConfiguration";
import APIResource from "./APIResource";


describe('APIResourceCleanupConfiguration', () => {
  const cloudUrl = 'https://cloud.bitbar.com';
  let service: APIResourceCleanupConfiguration;
  let api: API;

  beforeEach(() => {
    api = new API({
      baseURL: '',
      cloudUrl
    });
    service = new APIResourceCleanupConfiguration(api, 1);
  });

  it('should initialize proper endpoint path', () => {
    expect(service.toUrl()).toEqual('/cleanup-configurations/1');
  });

  it('should throw error if resource ID is missing', () => {
    expect(() => new APIResourceCleanupConfiguration(api, null as any)).toThrow(new Error('Resource ID cannot be null!'));
  });

  describe('@devices', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.devices();
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual('/cleanup-configurations/1/devices');
    });
  });

});

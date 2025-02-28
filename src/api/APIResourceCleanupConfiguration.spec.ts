import {API} from '../API';
import {APIResourceCleanupConfiguration} from './APIResourceCleanupConfiguration';
import APIList from './APIList';


describe('APIResourceCleanupConfiguration', () => {
  const cloudUrl = 'https://cloud.bitbar.com';
  let service: APIResourceCleanupConfiguration;
  let api: API;
  const baseId = 1;
  const baseUrl = `/cleanup-configurations/${baseId}`;

  beforeEach(() => {
    api = new API({
      baseURL: '',
      cloudUrl
    });
    service = new APIResourceCleanupConfiguration(api, baseId);
  });

  it('should initialize proper endpoint path', () => {
    expect(service.toUrl()).toEqual(`${baseUrl}`);
  });

  it('should throw error if resource ID is missing', () => {
    const id: any = undefined;
    expect(() => new APIResourceCleanupConfiguration(api, id)).toThrow(new Error('Resource ID cannot be null!'));
  });

  describe('@devices', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.devices();
      expect(call).toBeInstanceOf(APIList);
      expect(call.toUrl()).toEqual(`${baseUrl}/devices`);
    });
  });

});

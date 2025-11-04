import API from '../API';
import APIListScreenshots from './APIListScreenshots';
import APIList from './APIList';
import APIResourceDeviceSessionCommon from './APIResourceDeviceSessionCommon';


describe('APIListScreenshots', () => {
  const cloudUrl = 'https://cloud.bitbar.com';
  let api: API;
  let service: APIListScreenshots;
  let resourceDeviceSessionCommon: APIResourceDeviceSessionCommon;
  const baseId = 1;

  beforeEach(() => {
    api = new API({
      baseURL: '',
      cloudUrl
    });
    resourceDeviceSessionCommon = new APIResourceDeviceSessionCommon(api, baseId);
    service = new APIListScreenshots(resourceDeviceSessionCommon);
  });

  describe('Instance', () => {
    it('Is created properly', () => {
      expect(service).toBeDefined();
      expect(service).toBeInstanceOf(APIList);
      expect(service.root).toBeDefined();
      expect(service.root).toBeInstanceOf(API);
      expect(service.last).toEqual('screenshots');
    });
  });
});

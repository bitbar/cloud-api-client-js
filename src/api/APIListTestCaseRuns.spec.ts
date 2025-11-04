import API from '../API';
import APIList from './APIList';
import APIListTestCaseRuns from './APIListTestCaseRuns';
import APIResourceDeviceSessionCommon from './APIResourceDeviceSessionCommon';


describe('APIListTestCaseRuns', () => {
  const cloudUrl = 'https://cloud.bitbar.com';
  let api: API;
  let service: APIListTestCaseRuns;
  let resourceDeviceSessionCommon: APIResourceDeviceSessionCommon;
  const baseId = 1;

  beforeEach(() => {
    api = new API({
      baseURL: '',
      cloudUrl
    });
    resourceDeviceSessionCommon = new APIResourceDeviceSessionCommon(api, baseId);
    service = new APIListTestCaseRuns(resourceDeviceSessionCommon);
  });

  describe('Instance', () => {
    it('Is created properly', () => {
      expect(service).toBeDefined();
      expect(service).toBeInstanceOf(APIList);
      expect(service.root).toBeDefined();
      expect(service.root).toBeInstanceOf(API);
      expect(service.last).toEqual('test-case-runs');
    });
  });
});

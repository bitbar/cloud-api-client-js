import {API} from '../API';
import {APIResourceRun} from './APIResourceRun';
import {APIResourceDeviceSession} from './APIResourceDeviceSession';

describe('APIResourceRun', () => {
  const cloudUrl = 'https://cloud.bitbar.com';
  let service: APIResourceRun;
  let api: API;
  const baseId = 1;
  const baseUrl = `/runs/${baseId}`

  beforeEach(() => {
    api = new API({
      baseURL: '',
      cloudUrl
    });
    service = new APIResourceRun(api, baseId);
  });

  describe('@deviceSession', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.deviceSession(1);
      expect(call).toBeInstanceOf(APIResourceDeviceSession);
      expect(call.toUrl()).toEqual(`${baseUrl}/device-sessions/1`);
    });
  });

});

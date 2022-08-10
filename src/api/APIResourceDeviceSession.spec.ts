import {API} from "../API";
import {APIResourceDeviceSession} from "./APIResourceDeviceSession";
import {APIResource} from "./APIResource";


describe('APIResourceDeviceSession', () => {
  const cloudUrl = 'https://cloud.bitbar.com';
  let service: APIResourceDeviceSession;
  let api: API;

  beforeEach(() => {
    api = new API({
      baseURL: '',
      cloudUrl
    });
    service = new APIResourceDeviceSession(api, 1);
  });

  describe('@abort', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.abort();
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual('/device-sessions/1/abort');
    });
  });

  describe('@retry', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.retry();
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual('/device-sessions/1/retry');
    });
  });

});

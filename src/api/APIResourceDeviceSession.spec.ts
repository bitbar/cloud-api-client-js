import {API} from '../API';
import {APIResourceDeviceSession} from './APIResourceDeviceSession';
import {APIResource} from './APIResource';
import APIList from './APIList';

describe('APIResourceDeviceSession', () => {
  const cloudUrl = 'https://cloud.bitbar.com';
  let service: APIResourceDeviceSession;
  let api: API;
  const baseId = 1;
  const baseUrl = `/device-sessions/${baseId}`

  beforeEach(() => {
    api = new API({
      baseURL: '',
      cloudUrl
    });
    service = new APIResourceDeviceSession(api, baseId);
  });

  describe('@abort', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.abort();
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual(`${baseUrl}/abort`);
    });
  });

  describe('@retry', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.retry();
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual(`${baseUrl}/retry`);
    });
  });

  describe('@testCaseRuns', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.testCaseRuns();
      expect(call).toBeInstanceOf(APIList);
      expect(call.toUrl()).toEqual(`${baseUrl}/test-case-runs`);
    });
  });

});

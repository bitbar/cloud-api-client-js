import {API} from '../API';
import {APIAdminResourceDeviceSession} from './APIAdminResourceDeviceSession';
import {APIAdminResourceRun} from './APIAdminResourceRun';


describe('APIAdminResourceRun', () => {
  const cloudUrl = 'https://cloud.bitbar.com';
  let service: APIAdminResourceRun;
  let api: API;
  const baseId = 1;
  const baseUrl = `/runs/${baseId}`;

  beforeEach(() => {
    api = new API({
      baseURL: '',
      cloudUrl
    });
    service = new APIAdminResourceRun(api, 1);
  });

  it('should initialize proper endpoint path', () => {
    expect(service.toUrl()).toEqual(`${baseUrl}`);
  });

  it('should throw error if resource ID is missing', () => {
    const id: any = undefined;
    expect(() => new APIAdminResourceRun(api, id)).toThrow(new Error('Resource ID cannot be null!'));
  });

  describe('@deviceSession', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.deviceSession(1);
      expect(call).toBeInstanceOf(APIAdminResourceDeviceSession);
      expect(call.toUrl()).toEqual(`${baseUrl}/device-sessions/1`);
    });
  });

});

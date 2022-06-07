import {API} from "../API";
import {APIAdminResourceDeviceSession} from "./APIAdminResourceDeviceSession";
import {APIAdminResourceRun} from "./APIAdminResourceRun";
import {APIResource} from "./APIResource";


describe('APIAdminResourceRun', () => {
  const cloudUrl = 'https://cloud.bitbar.com';
  let service: APIAdminResourceRun;
  let api: API;

  beforeEach(() => {
    api = new API({
      baseURL: '',
      cloudUrl
    });
    service = new APIAdminResourceRun(api, 1);
  });

  it('should initialize proper endpoint path', () => {
    expect(service.toUrl()).toEqual('/runs/1');
  });

  it('should throw error if resource ID is missing', () => {
    try {
      // @ts-ignore
      service = new APIAdminResourceRun(api);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  describe('@buildLogsZip', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.buildLogsZip();
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual('/runs/1/build-logs.zip');
    });
  });

  describe('@deviceSession', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.deviceSession(1);
      expect(call).toBeInstanceOf(APIAdminResourceDeviceSession);
      expect(call.toUrl()).toEqual('/runs/1/device-sessions/1');
    });
  });

});

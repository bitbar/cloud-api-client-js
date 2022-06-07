import {API} from "../API";
import {APIAdminResourceDeviceSessionStandalone} from "./APIAdminResourceDeviceSessionStandalone";
import {APIAdminResourceRun} from "./APIAdminResourceRun";
import {APIList} from "./APIList";
import {APIResource} from "./APIResource";


describe('APIAdminResourceDeviceSessionStandalone', () => {
  const cloudUrl = 'https://cloud.bitbar.com';
  let service: APIAdminResourceDeviceSessionStandalone;
  let api: API;
  let adminResource: APIAdminResourceRun;

  beforeEach(() => {
    api = new API({
      baseURL: '',
      cloudUrl
    });
    adminResource = new APIAdminResourceRun(api, 1);
    service = new APIAdminResourceDeviceSessionStandalone(adminResource, 1);
  });

  it('should initialize proper endpoint path', () => {
    expect(service.toUrl()).toEqual('/runs/1/device-sessions/1');
  });

  it('should throw error if resource ID is missing', () => {
    try {
      // @ts-ignore
      service = new APIAdminResourceDeviceSessionStandalone(adminResource);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  describe('@changeBillable', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.changeBillable(false);
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual('/admin/device-sessions/1/changebillable');
    });
  });

  describe('@connections', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.connections();
      expect(call).toBeInstanceOf(APIList);
      expect(call.toUrl()).toEqual('/runs/1/device-sessions/1/connections');
    });
  });

  describe('@connection', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.connection(1);
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual('/runs/1/device-sessions/1/connections/1');
    });

    it('should throw error if resource ID is missing', () => {
      try {
        // @ts-ignore
        service.connection();
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });

  describe('@release', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.release();
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual('/runs/1/device-sessions/1/release');
      expect((<any>call).requestConfig.method).toEqual('POST');
    });
  });

});

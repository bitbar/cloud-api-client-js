import {API} from "../API";
import {APIAdminResource} from "./APIAdminResource";
import {APIAdminResourceRunStandalone} from "./APIAdminResourceRunStandalone";
import {APIResource} from "./APIResource";


describe('APIAdminResourceRunStandalone', () => {
  const cloudUrl = 'https://cloud.bitbar.com';
  let service: APIAdminResourceRunStandalone;
  let api: API;
  let adminResource: APIAdminResource;

  beforeEach(() => {
    api = new API({
      baseURL: '',
      cloudUrl
    });
    adminResource = new APIAdminResource(api);
    service = new APIAdminResourceRunStandalone(adminResource, 1);
  });

  it('should initialize proper endpoint path', () => {
    expect(service.toUrl()).toEqual('/admin/runs/1');
  });

  it('should throw error if resource ID is missing', () => {
    try {
      // @ts-ignore
      service = new APIAdminResourceRunStandalone(adminResource);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  describe('@abort', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.abort();
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual('/admin/runs/1/abort');
      expect((<any>call).requestConfig.method).toEqual('POST');
    });
  });

  describe('@changeBillable', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.changeBillable(false);
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual('/admin/runs/1/changebillable');
      expect((<any>call).requestConfig.method).toEqual('POST');
      expect((<any>call).requestConfig.params.billable).toEqual(false);
    });
  });

  describe('@changePriority', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.changePriority(false);
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual('/admin/runs/1/changepriority');
      expect((<any>call).requestConfig.method).toEqual('POST');
      expect((<any>call).requestConfig.params.priority).toEqual(false);
    });
  });

  describe('@retry', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.retry();
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual('/admin/runs/1/retry');
      expect((<any>call).requestConfig.timeout).toEqual(0);
    });
  });

});

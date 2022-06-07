import {API} from "../API";
import {APIAdminListServices} from "./APIAdminListServices";
import {APIAdminResource} from "./APIAdminResource";
import {APIList} from "./APIList";


describe('APIAdminListServices', () => {
  const cloudUrl = 'https://cloud.bitbar.com';
  let service: APIAdminListServices;
  let api: API;
  let adminResource: APIAdminResource;

  beforeEach(() => {
    api = new API({
      baseURL: '',
      cloudUrl
    });
    adminResource = new APIAdminResource(api);
    service = new APIAdminListServices(adminResource);
  });

  it('should initialize proper endpoint path', () => {
    expect(service.toUrl()).toEqual('/admin/services');
  });

  describe('@available', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.available();
      expect(call).toBeInstanceOf(APIList);
      expect(call.toUrl()).toEqual('/admin/services/available');
    });
  });

  describe('@active', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.active();
      expect(call).toBeInstanceOf(APIList);
      expect(call.toUrl()).toEqual('/admin/services');
      expect((<any>call).requestConfig.params.notArchived).toEqual(true);
    });
  });

  describe('@activated', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.activated();
      expect(call).toBeInstanceOf(APIList);
      expect(call.toUrl()).toEqual('/admin/services');
      expect((<any>call).requestConfig.params.filter).toEqual('activated_eq_true');
      expect((<any>call).requestConfig.params.limit).toEqual(0);
      expect((<any>call).requestConfig.params.sort).toEqual('name_a');
    });
  });

  describe('@inUse', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.inUse();
      expect(call).toBeInstanceOf(APIList);
      expect(call.toUrl()).toEqual('/admin/services');
      expect((<any>call).requestConfig.params.inUse).toEqual(true);
      expect((<any>call).requestConfig.params.limit).toEqual(0);
      expect((<any>call).requestConfig.params.sort).toEqual('name_a');
    });
  });

  describe('@byPrice', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.byPrice();
      expect(call).toBeInstanceOf(APIList);
      expect(call.toUrl()).toEqual('/admin/services');
      expect((<any>call).requestConfig.params.sort).toEqual('centPrice_a');
    });
  });

});

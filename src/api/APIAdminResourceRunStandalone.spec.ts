import {API} from '../API';
import {APIAdminResource} from './APIAdminResource';
import {APIAdminResourceRunStandalone} from './APIAdminResourceRunStandalone';
import {APIResource} from './APIResource';


describe('APIAdminResourceRunStandalone', () => {
  const cloudUrl = 'https://cloud.bitbar.com';
  let service: APIAdminResourceRunStandalone;
  let api: API;
  let adminResource: APIAdminResource;
  const baseId = 1;
  const baseUrl = `/admin/runs/${baseId}`;

  beforeEach(() => {
    api = new API({
      baseURL: '',
      cloudUrl
    });
    adminResource = new APIAdminResource(api);
    service = new APIAdminResourceRunStandalone(adminResource, 1);
  });

  it('should initialize proper endpoint path', () => {
    expect(service.toUrl()).toEqual(`${baseUrl}`);
  });

  it('should throw error if resource ID is missing', () => {
    const id: any = undefined;
    expect(() => new APIAdminResourceRunStandalone(adminResource, id)).toThrow(new Error('Resource ID cannot be null!'));
  });

  describe('@abort', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.abort();
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual(`${baseUrl}/abort`);
      expect((<any>call).requestConfig.method).toEqual('POST');
    });
  });

  describe('@changeBillable', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.changeBillable(false);
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual(`${baseUrl}/changebillable`);
      expect((<any>call).requestConfig.method).toEqual('POST');
      expect((<any>call).requestConfig.params.billable).toEqual(false);
    });
  });

  describe('@changePriority', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.changePriority();
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual(`${baseUrl}/changepriority`);
      expect((<any>call).requestConfig.data ).toBeUndefined();
    });

    it('should initialize proper endpoint path with post data', () => {
      const call = service.changePriority(50);
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual(`${baseUrl}/changepriority`);
      expect((<any>call).requestConfig.method).toEqual('POST');
      expect((<any>call).requestConfig.data.priority).toEqual(50);
    });
  });

  describe('@retry', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.retry();
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual(`${baseUrl}/retry`);
      expect((<any>call).requestConfig.timeout).toEqual(0);
    });
  });

});

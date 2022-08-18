import {API} from '../API';
import {APIAdminResource} from './APIAdminResource';
import {APIAdminResourceDevice} from './APIAdminResourceDevice';
import {APIList} from './APIList';
import {APIResource} from './APIResource';


describe('APIAdminResourceDevice', () => {
  const cloudUrl = 'https://cloud.bitbar.com';
  let service: APIAdminResourceDevice;
  let api: API;
  let adminResource: APIAdminResource;
  const baseUrl = '/admin/devices';

  beforeEach(() => {
    api = new API({
      baseURL: '',
      cloudUrl
    });
    adminResource = new APIAdminResource(api);
    service = new APIAdminResourceDevice(adminResource, 1);
  });

  it('should initialize proper endpoint path', () => {
    expect(service.toUrl()).toEqual(`${baseUrl}/1`);
  });

  it('should throw error if resource ID is missing', () => {
    const id: any = undefined;
    expect(() => new APIAdminResourceDevice(adminResource, id)).toThrow(new Error('Resource ID cannot be null!'));
  });

  describe('@blink', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.blink();
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual(`${baseUrl}/1/blink`);
      expect((<any>call).requestConfig.method).toEqual('POST');
    });
  });

  describe('@cleanupConfiguration', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.cleanupConfiguration();
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual(`${baseUrl}/1/cleanup-configuration`);
    });
  });

  describe('@labels', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.labels();
      expect(call).toBeInstanceOf(APIList);
      expect(call.toUrl()).toEqual(`${baseUrl}/1/labels`);
    });
  });

  describe('@label', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.label(1);
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual(`${baseUrl}/1/labels/1`);
    });
  });

  describe('@queue', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.queue();
      expect(call).toBeInstanceOf(APIList);
      expect(call.toUrl()).toEqual(`${baseUrl}/1/queue`);
    });
  });

});

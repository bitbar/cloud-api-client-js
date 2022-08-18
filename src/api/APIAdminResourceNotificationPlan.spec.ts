import {API} from '../API';
import {APIAdminResource} from './APIAdminResource';
import {APIAdminResourceNotificationPlan} from './APIAdminResourceNotificationPlan';
import {APIList} from './APIList';
import {APIResource} from './APIResource';


describe('APIAdminResourceNotificationPlan', () => {
  const cloudUrl = 'https://cloud.bitbar.com';
  let service: APIAdminResourceNotificationPlan;
  let api: API;
  let adminResource: APIAdminResource;
  const baseId = 1;
  const baseUrl = `/admin/notification-plans/${baseId}`;

  beforeEach(() => {
    api = new API({
      baseURL: '',
      cloudUrl
    });
    adminResource = new APIAdminResource(api);
    service = new APIAdminResourceNotificationPlan(adminResource, 1);
  });

  it('should initialize proper endpoint path', () => {
    expect(service.toUrl()).toEqual(`${baseUrl}`);
  });

  it('should throw error if resource ID is missing', () => {
    const id: any = undefined;
    expect(() => new APIAdminResourceNotificationPlan(adminResource, id)).toThrow(new Error('Resource ID cannot be null!'));
  });

  describe('@check', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.check();
      expect(call).toBeInstanceOf(APIList);
      expect(call.toUrl()).toEqual(`${baseUrl}/check`);
    });
  });

  describe('@test', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.test();
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual(`${baseUrl}/test`);
    });
  });

  describe('@execute', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.execute();
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual(`${baseUrl}/execute`);
    });
  });

});

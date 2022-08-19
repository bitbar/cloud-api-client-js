import {API} from '../API';
import {APIAdminResource} from './APIAdminResource';
import {APIAdminResourceDeviceTime} from './APIAdminResourceDeviceTime';
import {APIList} from './APIList';


describe('APIAdminResourceDeviceTime', () => {
  const cloudUrl = 'https://cloud.bitbar.com';
  let service: APIAdminResourceDeviceTime;
  let api: API;
  let adminResource: APIAdminResource;
  const baseUrl = '/admin/device-time';

  beforeEach(() => {
    api = new API({
      baseURL: '',
      cloudUrl
    });
    adminResource = new APIAdminResource(api);
    service = new APIAdminResourceDeviceTime(adminResource);
  });

  it('should initialize proper endpoint path', () => {
    expect(service.toUrl()).toEqual(`${baseUrl}`);
  });

  describe('@countSessionReport', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.countSessionReport();
      expect(call).toBeInstanceOf(APIList);
      expect(call.toUrl()).toEqual(`${baseUrl}/count-session-report`);
    });
  });

  describe('@stepTimeReport', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.stepTimeReport();
      expect(call).toBeInstanceOf(APIList);
      expect(call.toUrl()).toEqual(`${baseUrl}/step-time-report`);
    });
  });

});

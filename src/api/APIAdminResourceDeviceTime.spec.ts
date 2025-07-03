import {API} from '../API';
import {APIAdminResource} from './APIAdminResource';
import {APIAdminResourceDeviceTime} from './APIAdminResourceDeviceTime';


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

});

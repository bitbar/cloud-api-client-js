import {API} from "../API";
import {APIAdminListDevices} from "./APIAdminListDevices";
import {APIAdminResource} from "./APIAdminResource";
import {APIListCleanupConfigurations} from "./APIListCleanupConfigurations";
import {APIResourceCleanupConfiguration} from "./APIResourceCleanupConfiguration";


describe('APIAdminListDevices', () => {
  const cloudUrl = 'https://cloud.bitbar.com';
  let service: APIAdminListDevices;
  let api: API;
  let adminResource: APIAdminResource;

  beforeEach(() => {
    api = new API({
      baseURL: '',
      cloudUrl
    });
    adminResource = new APIAdminResource(api);
    service = new APIAdminListDevices(adminResource);
  });

  it('should initialize proper endpoint path', () => {
    expect(service.toUrl()).toEqual('/admin/devices');
  });

  describe('@cleanupConfigurations', () => {
    it('should return APIListCleanupConfigurations', () => {
      const call = service.cleanupConfigurations();
      expect(call).toBeInstanceOf(APIListCleanupConfigurations);
    });
  });

  describe('@cleanupConfiguration', () => {
    it('should return APIResourceCleanupConfiguration', () => {
      const call = service.cleanupConfiguration(1);
      expect(call).toBeInstanceOf(APIResourceCleanupConfiguration);
    });
  });

});

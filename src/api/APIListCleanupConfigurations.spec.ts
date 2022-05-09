import API from "../API";
import APIAdminListDevices from "./APIAdminListDevices";
import APIListCleanupConfigurations from "./APIListCleanupConfigurations";
import APIResource from "./APIResource";

describe('APIListCleanupConfigurations', () => {
  const cloudUrl = 'https://cloud.bitbar.com';
  let service: APIListCleanupConfigurations;

  beforeEach(() => {
    const api = new API({
      baseURL: '',
      cloudUrl
    });
    const parent = new APIAdminListDevices(api);

    service = new APIListCleanupConfigurations(parent);
  });

  it('should initialize proper endpoint path', () => {
    expect(service.toUrl()).toEqual('/admin/devices/cleanup-configurations');
  });

  describe('@specific', () => {
    it('should initialize proper endpoint path', () => {
      const result = service.specific();
      expect(result.toUrl()).toEqual('/admin/devices/cleanup-configurations/specific');
      expect(result).toBeInstanceOf(APIResource);
    });
  });
});

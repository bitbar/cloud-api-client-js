import {API} from '../API';
import {APIAdminListDevices} from './APIAdminListDevices';
import {APIListCleanupConfigurations} from './APIListCleanupConfigurations';
import {APIResource} from './APIResource';

describe('APIListCleanupConfigurations', () => {
  const cloudUrl = 'https://cloud.bitbar.com';
  let service: APIListCleanupConfigurations;
  const baseUrl = '/admin/devices/cleanup-configurations';

  beforeEach(() => {
    const api = new API({
      baseURL: '',
      cloudUrl
    });
    const parent = new APIAdminListDevices(api);

    service = new APIListCleanupConfigurations(parent);
  });

  it('should initialize proper endpoint path', () => {
    expect(service.toUrl()).toEqual(`${baseUrl}`);
  });

  describe('@specific', () => {
    it('should initialize proper endpoint path', () => {
      const result = service.specific();
      expect(result.toUrl()).toEqual(`${baseUrl}/specific`);
      expect(result).toBeInstanceOf(APIResource);
    });
  });
});

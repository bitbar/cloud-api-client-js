import {API} from '../API';
import {APIAdminListStatistics} from './APIAdminListStatistics';
import {APIAdminResource} from './APIAdminResource';
import {APIList} from './APIList';


describe('APIAdminListStatistics', () => {
  const cloudUrl = 'https://cloud.bitbar.com';
  let service: APIAdminListStatistics;
  let api: API;
  let adminResource: APIAdminResource;
  const baseUrl = '/admin/statistics';

  beforeEach(() => {
    api = new API({
      baseURL: '',
      cloudUrl
    });
    adminResource = new APIAdminResource(api);
    service = new APIAdminListStatistics(adminResource);
  });

  it('should initialize proper endpoint path', () => {
    expect(service.toUrl()).toEqual(`${baseUrl}`);
  });


  describe('@frameworks', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.frameworks();
      expect(call).toBeInstanceOf(APIList);
      expect(call.toUrl()).toEqual(`${baseUrl}/frameworks`);
    });
  });

});

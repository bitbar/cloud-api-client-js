import {API} from '../API';
import {APIAdminResource} from './APIAdminResource';
import {APIAdminResourceDeviceModel} from './APIAdminResourceDeviceModel';
import {APIList} from './APIList';


describe('APIAdminResourceDeviceModel', () => {
  const cloudUrl = 'https://cloud.bitbar.com';
  let service: APIAdminResourceDeviceModel;
  let api: API;
  let adminResource: APIAdminResource;
  const baseId = 1;
  const baseUrl = `/admin/device-models/${baseId}`;

  beforeEach(() => {
    api = new API({
      baseURL: '',
      cloudUrl
    });
    adminResource = new APIAdminResource(api);
    service = new APIAdminResourceDeviceModel(adminResource, baseId);
  });

  it('should initialize proper endpoint path', () => {
    expect(service.toUrl()).toEqual(`${baseUrl}`);
  });

  it('should throw error if resource ID is missing', () => {
    const id: any = undefined;
    expect(() => new APIAdminResourceDeviceModel(adminResource, id)).toThrow(new Error('Resource ID cannot be null!'));
  });

  describe('@browsers', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.browsers();
      expect(call).toBeInstanceOf(APIList);
      expect(call.toUrl()).toEqual(`${baseUrl}/browsers`);
    });
  });

});

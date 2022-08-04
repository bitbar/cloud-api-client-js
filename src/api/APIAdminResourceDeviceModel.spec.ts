import {API} from "../API";
import {APIAdminResource} from "./APIAdminResource";
import {APIAdminResourceDeviceModel} from "./APIAdminResourceDeviceModel";
import {APIList} from "./APIList";


describe('APIAdminResourceDeviceModel', () => {
  const cloudUrl = 'https://cloud.bitbar.com';
  let service: APIAdminResourceDeviceModel;
  let api: API;
  let adminResource: APIAdminResource;

  beforeEach(() => {
    api = new API({
      baseURL: '',
      cloudUrl
    });
    adminResource = new APIAdminResource(api);
    service = new APIAdminResourceDeviceModel(adminResource, 1);
  });

  it('should initialize proper endpoint path', () => {
    expect(service.toUrl()).toEqual('/admin/device-models/1');
  });

  it('should throw error if resource ID is missing', () => {
    try {
      // @ts-ignore
      service = new APIAdminResourceDeviceModel(adminResource);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  describe('@browsers', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.browsers();
      expect(call).toBeInstanceOf(APIList);
      expect(call.toUrl()).toEqual('/admin/device-models/1/browsers');
    });
  });

});

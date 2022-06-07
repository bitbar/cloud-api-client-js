import {API} from "../API";
import {APIAdminResource} from "./APIAdminResource";
import {APIAdminResourceCluster} from "./APIAdminResourceCluster";
import {APIList} from "./APIList";


describe('APIAdminResourceCluster', () => {
  const cloudUrl = 'https://cloud.bitbar.com';
  let service: APIAdminResourceCluster;
  let api: API;
  let adminResource: APIAdminResource;

  beforeEach(() => {
    api = new API({
      baseURL: '',
      cloudUrl
    });
    adminResource = new APIAdminResource(api);
    service = new APIAdminResourceCluster(adminResource, 1);
  });

  it('should initialize proper endpoint path', () => {
    expect(service.toUrl()).toEqual('/clusters/1');
  });

  it('should throw error if resource ID is missing', () => {
    try {
      // @ts-ignore
      service = new APIAdminResourceCluster(adminResource);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  describe('@devices', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.devices();
      expect(call).toBeInstanceOf(APIList);
      expect(call.toUrl()).toEqual('/clusters/1/devices');
    });
  });

});

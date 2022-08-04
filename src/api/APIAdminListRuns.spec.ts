import {API} from "../API";
import {APIAdminListRuns} from "./APIAdminListRuns";
import {APIAdminResource} from "./APIAdminResource";
import {APIResource} from "./APIResource";


describe('APIAdminListRuns', () => {
  const cloudUrl = 'https://cloud.bitbar.com';
  let service: APIAdminListRuns;
  let api: API;
  let adminResource: APIAdminResource;

  beforeEach(() => {
    api = new API({
      baseURL: '',
      cloudUrl
    });
    adminResource = new APIAdminResource(api);
    service = new APIAdminListRuns(adminResource);
  });

  it('should initialize proper endpoint path', () => {
    expect(service.toUrl()).toEqual('/admin/runs');
  });

  describe('@config', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.config();
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual('/runs/config');
    });
  });

});

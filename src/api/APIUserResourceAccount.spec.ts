import {API} from '../API';
import {APIUserResourceAccount} from './APIUserResourceAccount';
import {APIResource} from './APIResource';
import {APIResourceUser} from './APIResourceUser';


describe('APIUserResourceAccount', () => {
  const cloudUrl = 'https://cloud.bitbar.com';
  let service: APIUserResourceAccount;
  let api: API;
  let resourceUser: APIResourceUser;
  const baseId = 1;
  const baseUrl = `/users/${baseId}/account`

  beforeEach(() => {
    api = new API({
      baseURL: '',
      cloudUrl
    });

    resourceUser = new APIResourceUser(api, baseId)
    service = new APIUserResourceAccount(resourceUser);
  });

  it('should initialize proper endpoint path', () => {
    expect(service.toUrl()).toEqual(baseUrl);
  });

  describe('@visualTestsAccess', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.visualTestAccess();
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual(`${baseUrl}/visualtest/access`);
    });
  });
});

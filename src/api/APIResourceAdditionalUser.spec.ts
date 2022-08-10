import {API} from "../API";
import {APIResourceAdditionalUser} from "./APIResourceAdditionalUser";
import {APIResource} from "./APIResource";
import {APIUserResourceAccount} from "./APIUserResourceAccount";
import APIResourceUser from "./APIResourceUser";


describe('APIResourceAdditionalUser', () => {
  const cloudUrl = 'https://cloud.bitbar.com';
  let service: APIResourceAdditionalUser;
  let userResourceAccount: APIUserResourceAccount;
  let resourceUser: APIResourceUser;
  let api: API;

  beforeEach(() => {
    api = new API({
      baseURL: '',
      cloudUrl
    });
    resourceUser = new APIResourceUser(api, 1);
    userResourceAccount = new APIUserResourceAccount(resourceUser);
    service = new APIResourceAdditionalUser(userResourceAccount, 1);
  });

  it('should initialize proper endpoint path', () => {
    expect(service.toUrl()).toEqual('/users/1/account/additional-users/1');
  });

  it('should throw error if resource ID is missing', () => {
    expect(() => new APIResourceAdditionalUser(userResourceAccount, null as any)).toThrow(new Error('Resource ID cannot be null!'));
  });

  describe('@resendActivation', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.resendActivation();
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual('/users/1/account/additional-users/1/resend-activation');
    });
  });

});

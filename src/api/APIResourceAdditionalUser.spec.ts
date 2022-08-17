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
  const baseId = 1;
  const baseUrl = `/users/${baseId}/account/additional-users/${baseId}`;

  beforeEach(() => {
    api = new API({
      baseURL: '',
      cloudUrl
    });
    resourceUser = new APIResourceUser(api, baseId);
    userResourceAccount = new APIUserResourceAccount(resourceUser);
    service = new APIResourceAdditionalUser(userResourceAccount, baseId);
  });

  it('should initialize proper endpoint path', () => {
    expect(service.toUrl()).toEqual(`${baseUrl}`);
  });

  it('should throw error if resource ID is missing', () => {
    const id: any = undefined;
    expect(() => new APIResourceAdditionalUser(userResourceAccount, id)).toThrow(new Error('Resource ID cannot be null!'));
  });

  describe('@resendActivation', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.resendActivation();
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual(`${baseUrl}/resend-activation`);
    });
  });

});

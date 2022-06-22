import {API} from "../API";
import {APIResourceAdditionalUser} from "./APIResourceAdditionalUser";
import APIResource from "./APIResource";


describe('APIResourceAdditionalUser', () => {
  const cloudUrl = 'https://cloud.bitbar.com';
  let service: APIResourceAdditionalUser;
  let api: API;

  beforeEach(() => {
    api = new API({
      baseURL: '',
      cloudUrl
    });
    service = new APIResourceAdditionalUser(api, 1);
  });

  it('should initialize proper endpoint path', () => {
    expect(service.toUrl()).toEqual('/additional-users/1');
  });

  it('should throw error if resource ID is missing', () => {
    expect(() => new APIResourceAdditionalUser(api, null as any)).toThrow(new Error('Resource ID cannot be null!'));
  });

  describe('@resendActivation', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.resendActivation();
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual('/additional-users/1/resend-activation');
    });
  });

});

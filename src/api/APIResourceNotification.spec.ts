import {API} from "../API";
import {APIResourceNotification} from "./APIResourceNotification";
import {APIResource} from "./APIResource";
import APIResourceUser from "./APIResourceUser";

describe('APIResourceNotification', () => {
  const cloudUrl = 'https://cloud.bitbar.com';
  let service: APIResourceNotification;
  let userResource: APIResourceUser;
  let api: API;

  beforeEach(() => {
    api = new API({
      baseURL: '',
      cloudUrl
    });
    userResource = new APIResourceUser(api, 1);
    service = new APIResourceNotification(userResource, 1);
  });


  it('should initialize proper endpoint path', () => {
    expect(service.toUrl()).toEqual('/users/1/notifications/1');
  });

  it('should throw error if resource ID is missing', () => {
    expect(() => new APIResourceNotification(userResource, null as any)).toThrow(new Error('Resource ID cannot be null!'));
  });

  describe('@test', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.test();
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual('/users/1/notifications/1/test');
    });
  });

});

import {API} from "../API";
import {APIResourceNotification} from "./APIResourceNotification";
import APIResource from "./APIResource";

describe('APIResourceNotification', () => {
  const cloudUrl = 'https://cloud.bitbar.com';
  let service: APIResourceNotification;
  let api: API;

  beforeEach(() => {
    api = new API({
      baseURL: '',
      cloudUrl
    });
    service = new APIResourceNotification(api, 1);
  });


  it('should initialize proper endpoint path', () => {
    expect(service.toUrl()).toEqual('/notifications/1');
  });

  it('should throw error if resource ID is missing', () => {
    expect(() => new APIResourceNotification(api, null as any)).toThrow(new Error('Resource ID cannot be null!'));
  });

  describe('@test', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.test();
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual('/notifications/1/test');
    });
  });

});

import {API} from "../API";
import {APIResourceNotification} from "./APIResourceNotification";
import {APIResource} from "./APIResource";
import APIResourceUser from "./APIResourceUser";

describe('APIResourceNotification', () => {
  const cloudUrl = 'https://cloud.bitbar.com';
  let service: APIResourceNotification;
  let userResource: APIResourceUser;
  let api: API;
  const baseId = 1;
  const baseUrl = `/users/${baseId}/notifications/${baseId}`

  beforeEach(() => {
    api = new API({
      baseURL: '',
      cloudUrl
    });
    userResource = new APIResourceUser(api, baseId);
    service = new APIResourceNotification(userResource, baseId);
  });


  it('should initialize proper endpoint path', () => {
    expect(service.toUrl()).toEqual(`${baseUrl}`);
  });

  it('should throw error if resource ID is missing', () => {
    const id: any = undefined;
    expect(() => new APIResourceNotification(userResource, id)).toThrow(new Error('Resource ID cannot be null!'));
  });

  describe('@test', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.test();
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual(`${baseUrl}/test`);
    });
  });

});

import {API} from '../API';
import {APIList} from './APIList';
import {APIListNotifications} from './APIListNotifications';
import {APIResourceChannel} from './APIResourceChannel';
import {APIResourceUser} from './APIResourceUser';


describe('APIResourceChannel', () => {
  const cloudUrl = 'https://cloud.bitbar.com';
  let service: APIResourceChannel;
  let api: API;
  let user: APIResourceUser;
  let notifications: APIListNotifications;
  const baseId = 1;
  const baseType = 'email';
  const baseUrl = `/users/${baseId}/notifications/channels/${baseType}`;

  beforeEach(() => {
    api = new API({
      baseURL: '',
      cloudUrl
    });
    user = new APIResourceUser(api, baseId);
    notifications = new APIListNotifications(user);
    service = new APIResourceChannel(notifications, baseType);
  });

  it('should initialize proper endpoint path', () => {
    expect(service.toUrl()).toEqual(`${baseUrl}`);
  });

  it('should throw error if resource ID is missing', () => {
    const type: any = undefined;
    expect(() => new APIResourceChannel(notifications, type)).toThrow(new Error('Resource ID cannot be null!'));
  });

  describe('@scopes', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.scopes();
      expect(call).toBeInstanceOf(APIList);
      expect(call.toUrl()).toEqual(`${baseUrl}/scopes`);
    });
  });

});

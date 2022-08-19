import {API} from '../API';
import {APIList} from './APIList';
import {APIListNotifications} from './APIListNotifications';
import {APIResourceChannel} from './APIResourceChannel';
import {APIResourceUser} from './APIResourceUser';


describe('APIListNotifications', () => {
  const cloudUrl = 'https://cloud.bitbar.com';
  const baseUrl = '/me/notifications';
  let service: APIListNotifications;

  beforeEach(() => {
    const api = new API({
      baseURL: '',
      cloudUrl
    });
    const parent = new APIResourceUser(api, 'me');

    service = new APIListNotifications(parent);
  });

  it('should initialize proper endpoint path', () => {
    expect(service.toUrl()).toEqual(`${baseUrl}`);
  });

  describe('@scopes', () => {
    it('should initialize proper endpoint path', () => {
      const result = service.scopes();
      expect(result.toUrl()).toEqual(`${baseUrl}/scopes`);
      expect(result).toBeInstanceOf(APIList);
    });
  });

  describe('@used', () => {
    it('should initialize proper endpoint path', () => {
      const result = service.channels();
      expect(result.toUrl()).toEqual(`${baseUrl}/channels`);
      expect(result).toBeInstanceOf(APIList);
    });
  });

  describe('@channel', () => {
    it('should initialize proper endpoint path', () => {
      const type = 'email';
      const result = service.channel(type);
      expect(result).toBeInstanceOf(APIResourceChannel);
    });
  });
});

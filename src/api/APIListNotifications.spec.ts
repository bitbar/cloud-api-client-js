import API from "../API";
import APIList from "./APIList";
import APIListNotifications from "./APIListNotifications";
import APIResourceUser from "./APIResourceUser";

describe('APIListNotifications', () => {
  const cloudUrl = 'https://cloud.bitbar.com';
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
    expect(service.toUrl()).toEqual('/me/notifications');
  });

  describe('@scopes', () => {
    it('should initialize proper endpoint path', () => {
      const result = service.scopes();
      expect(result.toUrl()).toEqual('/me/notifications/scopes');
      expect(result).toBeInstanceOf(APIList);
    });
  });

  describe('@used', () => {
    it('should initialize proper endpoint path', () => {
      const result = service.channels();
      expect(result.toUrl()).toEqual('/me/notifications/channels');
      expect(result).toBeInstanceOf(APIList);
    });
  });
});

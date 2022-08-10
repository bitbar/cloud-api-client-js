import {API} from "../API";
import {APIResourceUserSession} from "./APIResourceUserSession";
import {APIResource} from "./APIResource";


describe('APIResourceUserSession', () => {
  const cloudUrl = 'https://cloud.bitbar.com';
  let service: APIResourceUserSession;
  let api: API;

  beforeEach(() => {
    api = new API({
      baseURL: '',
      cloudUrl
    });
    service = new APIResourceUserSession(api);
  });

  it('should initialize proper endpoint path', () => {
    expect(service.toUrl()).toEqual('/user-sessions');
  });

  describe('@login', () => {
    it('should initialize proper endpoint path', () => {
      const data = {
        username: "login",
        password: "password"
      };
      const call = service.login(data);

      expect(call).toBeInstanceOf(APIResource);
      expect(call['requestConfig'].data).toBe(data)
    })
  });

  describe('@logout', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.logout();

      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual('/user-sessions/logout');
    });
  });

  describe('@sso', () => {
    it('should initialize proper endpoint path', () => {
      const userName = 'John';
      const call = service.sso(userName);

      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual(`/user-sessions/${userName}-login`);
    });
  });

  describe('@portalLogin', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.portalLogin();

      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual('/user-sessions/portal-login');
    });
  });
});

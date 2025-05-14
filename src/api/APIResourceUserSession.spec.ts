import {API} from '../API';
import {APIResourceUserSession} from './APIResourceUserSession';
import {APIResource} from './APIResource';


describe('APIResourceUserSession', () => {
  const cloudUrl = 'https://cloud.bitbar.com';
  let service: APIResourceUserSession;
  let api: API;
  const baseUrl = '/user-sessions';

  beforeEach(() => {
    api = new API({
      baseURL: '',
      cloudUrl
    });
    service = new APIResourceUserSession(api);
  });

  it('should initialize proper endpoint path', () => {
    expect(service.toUrl()).toEqual(`${baseUrl}`);
  });

  describe('@login', () => {
    it('should initialize proper endpoint path', () => {
      const data = {
        username: 'login',
        password: 'password'
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
      expect(call.toUrl()).toEqual(`${baseUrl}/logout`);
    });
  });

  describe('@sso', () => {
    it('should initialize proper endpoint path', () => {
      const userName = 'John';
      const call = service.sso(userName);

      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual(`/user-sessions/oauth/authorize/${userName}-login`);
    });
  });

  describe('@sbidCallbackUrl', () => {
    it('should return redirect URL for SBID login callback', () => {
      const url = service.sbidCallbackUrl();

      expect(url).toEqual(`${cloudUrl}/api${baseUrl}/oauth/authorize/sbid-login`);
    });
  });
});

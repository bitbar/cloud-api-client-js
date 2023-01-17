import {API} from '../API';
import {APIListUsers} from './APIListUsers';
import {APIResource} from './APIResource';

describe('APIListUsers', () => {
  const cloudUrl = 'https://cloud.bitbar.com';
  let service: APIListUsers;
  const baseUrl = `/users`;

  beforeEach(() => {
    const api = new API({
      baseURL: '',
      cloudUrl
    });

    service = new APIListUsers(api);
  });

  it('should initialize proper endpoint path', () => {
    expect(service.toUrl()).toEqual(`${baseUrl}`);
  });

  describe('@activate', () => {
    it('should initialize proper endpoint path', () => {
      const result = service.activate();
      expect(result.toUrl()).toEqual(`${baseUrl}/activate`);
      expect(result).toBeInstanceOf(APIResource);
    });
  });

  describe('@recoveries', () => {
    it('should initialize proper endpoint path', () => {
      const result = service.recoveries();
      expect(result.toUrl()).toEqual(`${baseUrl}/recoveries`);
      expect(result).toBeInstanceOf(APIResource);
    });
  });

  describe('@passwordRecovery', () => {
    it('should initialize proper endpoint path', () => {
      const result = service.passwordRecovery();
      expect(result.toUrl()).toEqual(`${baseUrl}/password-recovery`);
      expect(result).toBeInstanceOf(APIResource);
    });
  });

});

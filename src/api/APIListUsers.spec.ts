import API from "../API";
import APIListUsers from "./APIListUsers";
import APIResource from "./APIResource";

describe('APIListUsers', () => {
  const cloudUrl = 'https://cloud.bitbar.com';
  let service: APIListUsers;

  beforeEach(() => {
    const api = new API({
      baseURL: '',
      cloudUrl
    });

    service = new APIListUsers(api);
  });

  it('should initialize proper endpoint path', () => {
    expect(service.toUrl()).toEqual('/users');
  });

  describe('@activate', () => {
    it('should initialize proper endpoint path', () => {
      const result = service.activate();
      expect(result.toUrl()).toEqual('/users/activate');
      expect(result).toBeInstanceOf(APIResource);
    });
  });

  describe('@recoveries', () => {
    it('should initialize proper endpoint path', () => {
      const result = service.recoveries();
      expect(result.toUrl()).toEqual('/users/recoveries');
      expect(result).toBeInstanceOf(APIResource);
    });
  });

  describe('@passwordRecovery', () => {
    it('should initialize proper endpoint path', () => {
      const result = service.passwordRecovery();
      expect(result.toUrl()).toEqual('/users/password-recovery');
      expect(result).toBeInstanceOf(APIResource);
    });
  });

  describe('@validateVatId', () => {
    it('should initialize proper endpoint path', () => {
      const result = service.validateVatId();
      expect(result.toUrl()).toEqual('/users/validateVatId');
      expect(result).toBeInstanceOf(APIResource);
    });
  });

});

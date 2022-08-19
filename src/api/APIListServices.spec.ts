import {API} from '../API';
import {APIList} from './APIList';
import {APIListServices} from './APIListServices';
import {APIResourceUser} from './APIResourceUser';

describe('APIListServices', () => {
  const cloudUrl = 'https://cloud.bitbar.com';
  let service: APIListServices;
  let api: API;
  const baseUrl = '/me/services';

  beforeEach(() => {
    api = new API({
      baseURL: '',
      cloudUrl
    });
    const parent = new APIResourceUser(api, 'me');

    service = new APIListServices(parent);
  });

  it('should initialize proper endpoint path', () => {
    expect(service.toUrl()).toEqual(`${baseUrl}`);
  });

  describe('@available', () => {
    it('should initialize proper endpoint path', () => {
      const result = service.available();
      expect(result.toUrl()).toEqual(`${baseUrl}/available`);
      expect(result).toBeInstanceOf(APIList);
    });
  });

  describe('@active', () => {
    it('should initialize proper endpoint path', () => {
      const result = service.active();
      expect(result.toUrl()).toEqual(`${baseUrl}/active`);
      expect(result).toBeInstanceOf(APIList);
    });

    it('should initialize proper endpoint path with notArchived query param', () => {
      const parent = new APIResourceUser(api, 1);
      service = new APIListServices(parent);
      const result = service.active();
      expect(result.toUrl()).toEqual('/users/1/services');
      expect(result).toBeInstanceOf(APIList);
      expect((<any>result).requestConfig.params.notArchived).toEqual(true);
    });
  });

});

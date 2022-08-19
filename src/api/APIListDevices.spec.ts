import {API} from '../API';
import {APIListDevices} from './APIListDevices';
import {APIResource} from './APIResource';

describe('APIListDevices', () => {
  const cloudUrl = 'https://cloud.bitbar.com';
  const baseUrl = '/devices';
  let service: APIListDevices;

  beforeEach(() => {
    const api = new API({
      baseURL: '',
      cloudUrl
    });

    service = new APIListDevices(api);
  });

  it('should initialize proper endpoint path', () => {
    expect(service.toUrl()).toEqual(`${baseUrl}`);
  });

  describe('@filters', () => {
    it('should initialize proper endpoint path', () => {
      const result = service.filters();
      expect(result.toUrl()).toEqual(`${baseUrl}/filters`);
      expect(result).toBeInstanceOf(APIResource);
    });
  });

  describe('@desktopBrowserCapabilities', () => {
    it('should initialize proper endpoint path', () => {
      const result = service.desktopBrowserCapabilities();
      expect(result.toUrl()).toEqual(`${baseUrl}/desktop-browser-capabilities`);
      expect(result).toBeInstanceOf(APIResource);
    });
  });
});

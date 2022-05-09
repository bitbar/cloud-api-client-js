import API from "../API";
import APIListDevices from "./APIListDevices";
import APIResource from "./APIResource";

describe('APIListDevices', () => {
  const cloudUrl = 'https://cloud.bitbar.com';
  let service: APIListDevices;

  beforeEach(() => {
    const api = new API({
      baseURL: '',
      cloudUrl
    });

    service = new APIListDevices(api);
  });

  it('should initialize proper endpoint path', () => {
    expect(service.toUrl()).toEqual('/devices');
  });

  describe('@filters', () => {
    it('should initialize proper endpoint path', () => {
      const result = service.filters();
      expect(result.toUrl()).toEqual('/devices/filters');
      expect(result).toBeInstanceOf(APIResource);
    });
  });

  describe('@desktopBrowserCapabilities', () => {
    it('should initialize proper endpoint path', () => {
      const result = service.desktopBrowserCapabilities();
      expect(result.toUrl()).toEqual('/devices/desktop-browser-capabilities');
      expect(result).toBeInstanceOf(APIResource);
    });
  });
});

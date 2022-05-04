import API from "../API";
import APIList from "./APIList";
import APIListServices from "./APIListServices";
import APIListSmartbearTunnels from "./APIListSmartbearTunnels";
import APIResourceUser from "./APIResourceUser";

describe('APIListSmartbearTunnels', () => {
  const cloudUrl = 'https://cloud.bitbar.com';
  let service: APIListSmartbearTunnels;
  let api: API;

  beforeEach(() => {
    api = new API({
      baseURL: '',
      cloudUrl
    });
    const parent = new APIResourceUser(api, 'me');

    service = new APIListSmartbearTunnels(parent);
  });

  it('should initialize proper endpoint path', () => {
    expect(service.toUrl()).toEqual('/me/tunnels');
  });

  describe('@active', () => {
    it('should initialize proper endpoint path with query param active set to true', () => {
      const result = service.active(true);
      expect(result.toUrl()).toEqual('/me/tunnels');
      expect(result).toBeInstanceOf(APIList);
      expect((<any>result).requestConfig.params.active).toEqual(true);
    });

    it('should initialize proper endpoint path with query param active set to false', () => {
      const result = service.active(false);
      expect(result.toUrl()).toEqual('/me/tunnels');
      expect(result).toBeInstanceOf(APIList);
      expect((<any>result).requestConfig.params.active).toEqual(false);
    });
  });

});

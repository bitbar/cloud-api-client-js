import API from "../API";
import APIListProperties from "./APIListProperties";
import APIResource from "./APIResource";

describe('APIListProperties', () => {
  const cloudUrl = 'https://cloud.bitbar.com';
  let service: APIListProperties;

  beforeEach(() => {
    const api = new API({
      baseURL: '',
      cloudUrl
    });

    service = new APIListProperties(api);
  });

  it('should initialize proper endpoint path', () => {
    expect(service.toUrl()).toEqual('/properties');
  });

  describe('@appBan', () => {
    it('should initialize proper endpoint path', () => {
      const result = service.appBan(1);
      expect(result.toUrl()).toEqual('/properties/app-bans');
      expect((<any>result).requestConfig.params.testRunId).toEqual(1);
    });

    it('should throw error if id isn\'t provided', () => {
      const id = <any>(<unknown>null);
      try {
        service.appBan(id);
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });

});

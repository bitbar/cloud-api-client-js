import {API} from "../API";
import APIEntity from "./APIEntity";
import {APIResource} from "./APIResource";


describe('APIResource', () => {
  const cloudUrl = 'https://cloud.bitbar.com';
  let service: APIResource;
  let api: API;

  beforeEach(() => {
    api = new API({
      baseURL: '',
      cloudUrl
    });
    service = new APIResource(api);
  });

  describe('Instance', () => {
    it('Is created properly', () => {
      expect(service).toBeDefined();
      expect(service).toBeInstanceOf(APIResource);
      expect(service).toBeInstanceOf(APIEntity);
      expect(service.root).toBeDefined();
      expect(service.root).toBeInstanceOf(API);
      expect(service.first).toBeUndefined();
    });
  });

  describe('@delete', () => {
    it('should set HTTP DELETE method in existing configuration', () => {
      const call = service.delete();
      expect((<any>service).requestConfig.method).toEqual('DELETE');
      expect(call).toEqual(service);
    });
  });

});

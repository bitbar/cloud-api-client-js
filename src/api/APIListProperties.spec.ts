import {API} from '../API';
import {APIListProperties} from './APIListProperties';

describe('APIListProperties', () => {
  const cloudUrl = 'https://cloud.bitbar.com';
  const baseUrl = '/properties';
  let service: APIListProperties;

  beforeEach(() => {
    const api = new API({
      baseURL: '',
      cloudUrl
    });

    service = new APIListProperties(api);
  });

  it('should initialize proper endpoint path', () => {
    expect(service.toUrl()).toEqual(`${baseUrl}`);
  });


  describe('@maintenance', () => {
    it('should initialize proper endpoint path', () => {
      const result = service.maintenance();
      expect(result.toUrl()).toEqual(`${baseUrl}`);
      expect((<any>result).requestConfig.params.filter).toEqual('name_eq_CLOUD_HEADER_ANNOUNCEMENT');
      expect((<any>result).requestConfig.params.limit).toEqual(1);
      expect((<any>result).requestConfig.params.sort).toEqual('updateTime_d');
    });
  });

});

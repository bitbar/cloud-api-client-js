import {API} from '../API';
import {APIResourceBroker} from './APIResourceBroker';
import {APIList} from './APIList';


describe('APIResourceBroker', () => {
  const cloudUrl = 'https://cloud.bitbar.com';
  let service: APIResourceBroker;
  let api: API;
  const baseUrl = `/broker`;

  beforeEach(() => {
    api = new API({
      baseURL: '',
      cloudUrl
    });
    service = new APIResourceBroker(api);
  });

  it('should initialize proper endpoint path', () => {
    expect(service.toUrl()).toEqual(`${baseUrl}`);
  });

  describe('@hubs', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.hubs();
      expect(call).toBeInstanceOf(APIList);
      expect(call.toUrl()).toEqual(`${baseUrl}/hubs`);
    });
  });

});

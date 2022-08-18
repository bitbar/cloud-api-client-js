import {API} from '../API';
import {APIListRuns} from './APIListRuns';
import {APIResource} from './APIResource';
import {APIResourceUser} from './APIResourceUser';

describe('APIListRuns', () => {
  const cloudUrl = 'https://cloud.bitbar.com';
  const baseUrl = '/me/runs';
  let service: APIListRuns;

  beforeEach(() => {
    const api = new API({
      baseURL: '',
      cloudUrl
    });
    const parent = new APIResourceUser(api, 'me');

    service = new APIListRuns(parent);
  });

  it('should initialize proper endpoint path', () => {
    expect(service.toUrl()).toEqual(`${baseUrl}`);
  });

  describe('@config', () => {
    it('should initialize proper endpoint path', () => {
      const result = service.config();
      expect(result.toUrl()).toEqual(`${baseUrl}/config`);
      expect(result).toBeInstanceOf(APIResource);
    });
  });

});

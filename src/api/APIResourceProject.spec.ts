import {API} from '../API';
import {APIResourceProject} from './APIResourceProject';
import {APIList} from './APIList';
import {APIResource} from './APIResource';
import {APIResourceUser} from './APIResourceUser';

describe('APIResourceProject', () => {
  const cloudUrl = 'https://cloud.bitbar.com';
  let service: APIResourceProject;
  let resourceUser: APIResourceUser;
  let api: API;
  const baseId = 1;
  const baseUrl = `/users/${baseId}/projects/${baseId}`

  beforeEach(() => {
    api = new API({
      baseURL: '',
      cloudUrl
    });
    resourceUser = new APIResourceUser(api, baseId);
    service = new APIResourceProject(resourceUser, baseId);
  });

  it('should initialize proper endpoint path', () => {
    expect(service.toUrl()).toEqual(`${baseUrl}`);
  });

  it('should throw error if resource ID is missing', () => {
    const id: any = undefined;
    expect(() => new APIResourceProject(resourceUser, id)).toThrow(new Error('Resource ID cannot be null!'));
  });

  describe('@runs', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.runs();
      expect(call).toBeInstanceOf(APIList);
      expect(call.toUrl()).toEqual(`${baseUrl}/runs`);
    });
  });

  describe('@run', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.run(1);
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual(`${baseUrl}/runs/1`);
    });
  });
});

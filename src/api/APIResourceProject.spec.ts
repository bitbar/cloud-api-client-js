import {API} from "../API";
import {APIResourceProject} from "./APIResourceProject";
import {APIList} from "./APIList";
import {APIResource} from "./APIResource";
import {APIResourceUser} from "./APIResourceUser";

describe('APIResourceProject', () => {
  const cloudUrl = 'https://cloud.bitbar.com';
  let service: APIResourceProject;
  let resourceUser: APIResourceUser;
  let api: API;

  beforeEach(() => {
    api = new API({
      baseURL: '',
      cloudUrl
    });
    resourceUser = new APIResourceUser(api, 1);
    service = new APIResourceProject(resourceUser, 1);
  });

  it('should initialize proper endpoint path', () => {
    expect(service.toUrl()).toEqual('/users/1/projects/1');
  });

  it('should throw error if resource ID is missing', () => {
    expect(() => new APIResourceProject(resourceUser, null as any)).toThrow(new Error('Resource ID cannot be null!'));
  });

  describe('@runs', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.runs();
      expect(call).toBeInstanceOf(APIList);
      expect(call.toUrl()).toEqual('/users/1/projects/1/runs');
    });
  });

  describe('@run', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.run(1);
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual('/users/1/projects/1/runs/1');
    });
  });

  describe('@files', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.files();
      expect(call).toBeInstanceOf(APIList);
      expect(call.toUrl()).toEqual('/users/1/projects/1/files');
    });
  });

  describe('@filesZip', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.filesZip();
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual('/users/1/projects/1/files.zip');
    });
  });
});

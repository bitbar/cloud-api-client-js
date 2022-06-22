import {API} from "../API";
import {APIResourceProject} from "./APIResourceProject";
import {APIList} from "./APIList";
import APIResource from "./APIResource";

describe('APIResourceProject', () => {
  const cloudUrl = 'https://cloud.bitbar.com';
  let service: APIResourceProject;
  let api: API;

  beforeEach(() => {
    api = new API({
      baseURL: '',
      cloudUrl
    });
    service = new APIResourceProject(api, 1);
  });

  it('should initialize proper endpoint path', () => {
    expect(service.toUrl()).toEqual('/projects/1');
  });

  it('should throw error if resource ID is missing', () => {
    expect(() => new APIResourceProject(api, null as any)).toThrow(new Error('Resource ID cannot be null!'));
  });

  describe('@runs', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.runs();
      expect(call).toBeInstanceOf(APIList);
      expect(call.toUrl()).toEqual('/projects/1/runs');
    });
  });

  describe('@run', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.run(1);
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual('/projects/1/runs/1');
    });
  });

  describe('@files', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.files();
      expect(call).toBeInstanceOf(APIList);
      expect(call.toUrl()).toEqual('/projects/1/files');
    });
  });

  describe('@filesZip', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.filesZip();
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual('/projects/1/files.zip');
    });
  });
});

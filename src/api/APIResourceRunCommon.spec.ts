import {API} from '../API';
import {APIResourceRunCommon} from './APIResourceRunCommon';
import {APIList} from './APIList';
import {APIResource} from './APIResource';


describe('APIResourceRunCommon', () => {
  const cloudUrl = 'https://cloud.bitbar.com';
  let service: APIResourceRunCommon;
  let api: API;
  const baseId = 1;
  const baseUrl = `/runs/${baseId}`

  beforeEach(() => {
    api = new API({
      baseURL: '',
      cloudUrl
    });
    service = new APIResourceRunCommon(api, baseId);
  });

  it('should initialize proper endpoint path', () => {
    expect(service.toUrl()).toEqual(`${baseUrl}`);
  });

  it('should throw error if resource ID is missing', () => {
    const id: any = undefined;
    expect(() => new APIResourceRunCommon(api, id)).toThrow(new Error('Resource ID cannot be null!'));
  });

  describe('@abort', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.abort();
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual(`${baseUrl}/abort`);
    });
  });

  describe('@dataAvailability', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.dataAvailability();
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual(`${baseUrl}/data-availability`);
    });
  });

  describe('@deviceSessions', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.deviceSessions();
      expect(call).toBeInstanceOf(APIList);
      expect(call.toUrl()).toEqual(`${baseUrl}/device-sessions`);
    });
  });

  describe('@filesZip', () => {
    it('should initialize proper endpoint path without passing a parameter', () => {
      const call = service.filesZip();
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual(`${baseUrl}/files.zip`);
      expect(call['requestConfig'].params).toBeUndefined();
    });

    it('should initialize proper endpoint path', () => {
      const call = service.filesZip([1]);
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual(`${baseUrl}/files.zip`);
      expect(call['requestConfig'].params).toStrictEqual({'deviceRunIds': [1]});
    });
  });

  describe('@logsZip', () => {
    it('should initialize proper endpoint path without passing a parameter', () => {
      const call = service.logsZip();
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual(`${baseUrl}/logs.zip`);
      expect(call['requestConfig'].params).toBeUndefined();
    });

    it('should initialize proper endpoint path', () => {
      const call = service.logsZip([1]);
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual(`${baseUrl}/logs.zip`);
      expect(call['requestConfig'].params).toStrictEqual({'deviceRunIds': [1]});
    });
  });

  describe('@performanceZip', () => {
    it('should initialize proper endpoint path without passing a parameter', () => {
      const call = service.performanceZip();
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual(`${baseUrl}/performance.zip`);
      expect(call['requestConfig'].params).toBeUndefined();
    });

    it('should initialize proper endpoint path', () => {
      const call = service.performanceZip([1]);
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual(`${baseUrl}/performance.zip`);
      expect(call['requestConfig'].params).toStrictEqual({'deviceRunIds': [1]});
    });
  });

  describe('@retry', () => {
    it('should initialize proper endpoint path without passing a parameter', () => {
      const call = service.retry();
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual(`${baseUrl}/retry`);
      expect(call['requestConfig'].params).toBeUndefined();
    });

    it('should initialize proper endpoint path', () => {

      const call = service.retry([1]);
      const requestConfigObject = {'timeout': 0}
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual(`${baseUrl}/retry`);
      expect(call['requestConfig'].timeout).toEqual(requestConfigObject.timeout);
      expect(call['requestConfig'].params).toStrictEqual({'deviceRunIds': [1]});
    });
  });

  describe('@screenshotNames', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.screenshotNames();
      expect(call).toBeInstanceOf(APIList);
      expect(call.toUrl()).toEqual(`${baseUrl}/screenshot-names`);
    });
  });

  describe('@screenshots', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.screenshots();
      expect(call).toBeInstanceOf(APIList);
      expect(call.toUrl()).toEqual(`${baseUrl}/screenshots`);
    });
  });

  describe('@screenshotsZip', () => {
    it('should initialize proper endpoint path without passing a parameter', () => {
      const call = service.screenshotsZip();
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual(`${baseUrl}/screenshots.zip`);
      expect(call['requestConfig'].params).toBeUndefined();
    });

    it('should initialize proper endpoint path', () => {
      const call = service.screenshotsZip([1]);
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual(`${baseUrl}/screenshots.zip`);
      expect(call['requestConfig'].params).toStrictEqual({'deviceRunIds': [1]});
    });
  });

  describe('@steps', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.steps();
      expect(call).toBeInstanceOf(APIList);
      expect(call.toUrl()).toEqual(`${baseUrl}/steps`);
    });
  });

  describe('@tags', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.tags();
      expect(call).toBeInstanceOf(APIList);
      expect(call.toUrl()).toEqual(`${baseUrl}/tags`);
    });
  });

  describe('@tag', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.tag(1);
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual(`${baseUrl}/tags/1`);
    });

    it('should throw error if resource ID is nulll', () => {
      const id: any = undefined;
      expect(() => service.tag(id)).toThrow(new Error('Resource ID cannot be null!'));
    });
  });
});

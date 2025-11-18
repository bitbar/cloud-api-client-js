import {API} from '../API';
import {APIResourceDeviceSessionCommon} from './APIResourceDeviceSessionCommon';
import {APIList} from './APIList';
import {APIResource} from './APIResource';
import {OutputFileset} from './class/OutputFileset';
import {InputFileset} from './class/InputFileset';


describe('APIResourceDeviceSessionCommon', () => {
  const cloudUrl = 'https://cloud.bitbar.com';
  let service: APIResourceDeviceSessionCommon;
  let api: API;
  const baseId = 1;
  const baseUrl = `/device-sessions/${baseId}`

  beforeEach(() => {
    api = new API({
      baseURL: '',
      cloudUrl
    });
    service = new APIResourceDeviceSessionCommon(api, baseId);
  });

  it('should initialize proper endpoint path', () => {
    expect(service.toUrl()).toEqual(`${baseUrl}`);
  });

  it('should throw error if resource ID is missing', () => {
    const id: any = undefined;
    expect(() => new APIResourceDeviceSessionCommon(api, id)).toThrow(new Error('Resource ID cannot be null!'));
  });

  describe('@commands', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.commands();
      expect(call).toBeInstanceOf(APIList);
      expect(call.toUrl()).toEqual(`${baseUrl}/commands`);
    });
  });

  describe('@input', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.input();
      expect(call).toBeInstanceOf(InputFileset);
      expect(call.toUrl()).toEqual(`${baseUrl}/input-file-set`);
    });
  });

  describe('@output', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.output();
      expect(call).toBeInstanceOf(OutputFileset);
      expect(call.toUrl()).toEqual(`${baseUrl}/output-file-set`);
    });
  });

  describe('@release', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.release();
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual(`${baseUrl}/release`);
    });
  });

  describe('@screenshots', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.screenshots();
      expect(call).toBeInstanceOf(APIList);
      expect(call.toUrl()).toEqual(`${baseUrl}/screenshots`);
    });
  });

  describe('@screenshot', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.screenshot(1);
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual(`${baseUrl}/screenshots/1`);
    });

    it('should throw error if resource ID is nulll', () => {
      const id: any = undefined;
      expect(() => service.screenshot(id)).toThrow(new Error('Resource ID cannot be null!'));
    });
  });

  describe('@steps', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.steps();
      expect(call).toBeInstanceOf(APIList);
      expect(call.toUrl()).toEqual(`${baseUrl}/steps`);
    });
  });

  describe('@step', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.step(1);
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual(`${baseUrl}/steps/1`);
    });

    it('should throw error if resource ID is nulll', () => {
      const id: any = undefined;
      expect(() => service.step(id)).toThrow(new Error('Resource ID cannot be null!'));
    });
  });

  describe('@currentStep', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.currentStep();
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual(`${baseUrl}/steps/current`);
    });
  });

  describe('@connections', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.connections();
      expect(call).toBeInstanceOf(APIList);
      expect(call.toUrl()).toEqual(`${baseUrl}/connections`);
    });
  });

  describe('@logs', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.logs();
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual(`${baseUrl}/logs`);
      expect((<any>call).requestConfig.responseType).toEqual('text');
    });
  });

  describe('@clusterLogs', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.clusterLogs();
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual(`${baseUrl}/cluster-logs`);
      expect((<any>call).requestConfig.responseType).toEqual('text');
    });
  });

});

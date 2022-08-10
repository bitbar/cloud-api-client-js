import {API} from "../API";
import {APIResourceDeviceSessionCommon} from "./APIResourceDeviceSessionCommon";
import {APIList} from "./APIList";
import {APIResource} from "./APIResource";
import {OutputFileset} from "./class/OutputFileset";
import {InputFileset} from "./class/InputFileset";


describe('APIResourceDeviceSessionCommon', () => {
  const cloudUrl = 'https://cloud.bitbar.com';
  let service: APIResourceDeviceSessionCommon;
  let api: API;

  beforeEach(() => {
    api = new API({
      baseURL: '',
      cloudUrl
    });
    service = new APIResourceDeviceSessionCommon(api, 1);
  });

  it('should initialize proper endpoint path', () => {
    expect(service.toUrl()).toEqual('/device-sessions/1');
  });

  it('should throw error if resource ID is missing', () => {
    expect(() => new APIResourceDeviceSessionCommon(api, null as any)).toThrow(new Error('Resource ID cannot be null!'));
  });

  describe('@commands', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.commands();
      expect(call).toBeInstanceOf(APIList);
      expect(call.toUrl()).toEqual('/device-sessions/1/commands');
    });
  });

  describe('@input', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.input();
      expect(call).toBeInstanceOf(InputFileset);
      expect(call.toUrl()).toEqual('/device-sessions/1/input-file-set');
    });
  });

  describe('@output', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.output();
      expect(call).toBeInstanceOf(OutputFileset);
      expect(call.toUrl()).toEqual('/device-sessions/1/output-file-set');
    });
  });

  describe('@screenshots', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.screenshots();
      expect(call).toBeInstanceOf(APIList);
      expect(call.toUrl()).toEqual('/device-sessions/1/screenshots');
    });
  });

  describe('@screenshot', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.screenshot(1);
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual('/device-sessions/1/screenshots/1');
    });

    it('should throw error if resource ID is nulll', () => {
      expect(() => service.screenshot(null as any)).toThrow(new Error('Resource ID cannot be null!'));
    });
  });

  describe('@steps', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.steps();
      expect(call).toBeInstanceOf(APIList);
      expect(call.toUrl()).toEqual('/device-sessions/1/steps');
    });
  });

  describe('@step', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.step(1);
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual('/device-sessions/1/steps/1');
    });

    it('should throw error if resource ID is nulll', () => {
      expect(() => service.step(null as any)).toThrow(new Error('Resource ID cannot be null!'));
    });
  });

  describe('@currentStep', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.currentStep();
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual('/device-sessions/1/steps/current');
    });
  });

  describe('@testCaseRuns', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.testCaseRuns();
      expect(call).toBeInstanceOf(APIList);
      expect(call.toUrl()).toEqual('/device-sessions/1/test-case-runs');
    });
  });

});

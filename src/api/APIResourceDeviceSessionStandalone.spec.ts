import {API} from "../API";
import {APIResourceDeviceSessionStandalone} from "./APIResourceDeviceSessionStandalone";
import {APIList} from "./APIList";
import APIResource from "./APIResource";
import OutputFileset from "./class/OutputFileset";
import InputFileset from "./class/InputFileset";


describe('APIResourceDeviceSessionStandalone', () => {
  const cloudUrl = 'https://cloud.bitbar.com';
  let service: APIResourceDeviceSessionStandalone;
  let api: API;

  beforeEach(() => {
    api = new API({
      baseURL: '',
      cloudUrl
    });
    service = new APIResourceDeviceSessionStandalone(api, 1);
  });

  it('should initialize proper endpoint path', () => {
    expect(service.toUrl()).toEqual('/device-sessions/1');
  });

  it('should throw error if resource ID is missing', () => {
    expect(() => new APIResourceDeviceSessionStandalone(api, null as any)).toThrow(new Error('Resource ID cannot be null!'));
  });

  describe('@connections', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.connections();
      expect(call).toBeInstanceOf(APIList);
      expect(call.toUrl()).toEqual('/device-sessions/1/connections');
    });
  });

  describe('@connection', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.connection(1);
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual('/device-sessions/1/connections/1');
    });

    it('should throw error if resource ID is nulll', () => {
      expect(() => service.connection(null as any)).toThrow(new Error('Resource ID cannot be null!'));
    });
  });

  describe('@release', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.release();
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual('/device-sessions/1/release');
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

});

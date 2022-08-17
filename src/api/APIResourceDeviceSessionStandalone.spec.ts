import {API} from "../API";
import {APIResourceDeviceSessionStandalone} from "./APIResourceDeviceSessionStandalone";
import {APIList} from "./APIList";
import {APIResource} from "./APIResource";
import {OutputFileset} from "./class/OutputFileset";
import {InputFileset} from "./class/InputFileset";
import {APIResourceUser} from "./APIResourceUser";


describe('APIResourceDeviceSessionStandalone', () => {
  const cloudUrl = 'https://cloud.bitbar.com';
  let service: APIResourceDeviceSessionStandalone;
  let userResource: APIResourceUser;
  let api: API;
  const baseId = 1;
  const baseUrl = `/users/${baseId}/device-sessions/${baseId}`

  beforeEach(() => {
    api = new API({
      baseURL: '',
      cloudUrl
    });
    userResource = new APIResourceUser(api, baseId);
    service = new APIResourceDeviceSessionStandalone(userResource, baseId);
  });

  it('should initialize proper endpoint path', () => {
    expect(service.toUrl()).toEqual(`${baseUrl}`);
  });

  it('should throw error if resource ID is missing', () => {
    const id: any = undefined;
    expect(() => new APIResourceDeviceSessionStandalone(userResource, id)).toThrow(new Error('Resource ID cannot be null!'));
  });

  describe('@connections', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.connections();
      expect(call).toBeInstanceOf(APIList);
      expect(call.toUrl()).toEqual(`${baseUrl}/connections`);
    });
  });

  describe('@connection', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.connection(1);
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual(`${baseUrl}/connections/1`);
    });

    it('should throw error if resource ID is nulll', () => {
      const id: any = undefined;
      expect(() => service.connection(id)).toThrow(new Error('Resource ID cannot be null!'));
    });
  });

  describe('@release', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.release();
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual(`${baseUrl}/release`);
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

});

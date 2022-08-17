import {API} from "../API";
import {APIResourceDeviceGroup} from "./APIResourceDeviceGroup";
import {APIList} from "./APIList";
import {APIResource} from "./APIResource";
import {APIResourceUser} from "./APIResourceUser";


describe('APIResourceDeviceGroup', () => {
  const cloudUrl = 'https://cloud.bitbar.com';
  let service: APIResourceDeviceGroup;
  let userResource: APIResourceUser;
  let api: API;
  const baseId = 1;
  const baseUrl = `/users/${baseId}/device-groups/${baseId}`

  beforeEach(() => {
    api = new API({
      baseURL: '',
      cloudUrl
    });
    userResource = new APIResourceUser(api, baseId);
    service = new APIResourceDeviceGroup(userResource, baseId);
  });

  it('should initialize proper endpoint path', () => {
    expect(service.toUrl()).toEqual(`${baseUrl}`);
  });

  it('should throw error if resource ID is missing', () => {
    const id: any = undefined;
    expect(() => new APIResourceDeviceGroup(userResource, id)).toThrow(new Error('Resource ID cannot be null!'));
  });

  describe('@devices', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.devices();
      expect(call).toBeInstanceOf(APIList);
      expect(call.toUrl()).toEqual(`${baseUrl}/devices`);
    });
  });

  describe('@device', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.device(1);
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual(`${baseUrl}/devices/1`);
    });

    it('should throw error if resource ID is nulll', () => {
      const id: any = undefined;
      expect(() => service.device(id)).toThrow(new Error('Resource ID cannot be null!'));
    });
  });

  describe('@selectors', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.selectors();
      expect(call).toBeInstanceOf(APIList);
      expect(call.toUrl()).toEqual(`${baseUrl}/selectors`);
    });
  });

  describe('@selector', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.selector(1);
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual(`${baseUrl}/selectors/1`);
    });

    it('should throw error if resource ID is nulll', () => {
      const id: any = undefined;
      expect(() => service.selector(id)).toThrow(new Error('Resource ID cannot be null!'));
    });
  });

  describe('@share', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.share();
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual(`${baseUrl}/share`);
    });
  });

});

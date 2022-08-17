import {API} from "../API";
import {APIResourceDevice} from "./APIResourceDevice";
import {APIList} from "./APIList";


describe('APIResourceDevice', () => {
  const cloudUrl = 'https://cloud.bitbar.com';
  let service: APIResourceDevice;
  let api: API;
  const baseId = 1;
  const baseUrl = `/devices/${baseId}`;

  beforeEach(() => {
    api = new API({
      baseURL: '',
      cloudUrl
    });
    service = new APIResourceDevice(api, 1);
  });

  it('should initialize proper endpoint path', () => {
    expect(service.toUrl()).toEqual(`${baseUrl}`);
  });

  it('should throw error if resource ID is missing', () => {
    const id: any = undefined;
    expect(() => new APIResourceDevice(api, id)).toThrow(new Error('Resource ID cannot be null!'));
  });

  describe('@properties', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.properties();
      expect(call).toBeInstanceOf(APIList);
      expect(call.toUrl()).toEqual(`${baseUrl}/properties`);
    });
  });

});

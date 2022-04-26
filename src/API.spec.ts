import {API} from "./API";
import APIAdminResource from "./api/APIAdminResource";
import APIList from "./api/APIList";
import APIListDevices from "./api/APIListDevices";
import APIListUsers from "./api/APIListUsers";
import {APIResource} from "./api/APIResource";
import APIResourceAccount from "./api/APIResourceAccount";
import APIResourceBroker from "./api/APIResourceBroker";
import APIResourceDevice from "./api/APIResourceDevice";
import APIResourceDeviceGroup from "./api/APIResourceDeviceGroup";
import APIResourceDeviceSession from "./api/APIResourceDeviceSession";
import APIResourceUser from "./api/APIResourceUser";
import APIResourceUserSession from "./api/APIResourceUserSession";


describe('API', () => {
  const cloudUrl = 'https://cloud.bitbar.com';
  let api: API;

  beforeEach(() => {
    api = new API({
      baseURL: '',
      cloudUrl
    });
  });

  describe('Instance', () => {
    it('Is created properly', () => {
      expect(api).toBeDefined();
      expect(api).toBeInstanceOf(API);
    });
  });

  it('should have hooks for first level endpoints', () => {
    expect(api.userSession()).toBeInstanceOf(APIResourceUserSession);
    expect(api.user(1)).toBeInstanceOf(APIResourceUser);
    expect(api.users()).toBeInstanceOf(APIListUsers);
    expect(api.account(1)).toBeInstanceOf(APIResourceAccount);
    expect(api.me()).toBeInstanceOf(APIResourceUser);
    expect(api.admin()).toBeInstanceOf(APIAdminResource);
    expect(api.devices()).toBeInstanceOf(APIListDevices);
    expect(api.device(1)).toBeInstanceOf(APIResourceDevice);
    expect(api.deviceGroups()).toBeInstanceOf(APIList);
    expect(api.deviceGroup(1)).toBeInstanceOf(APIResourceDeviceGroup);
    expect(api.deviceSessions()).toBeInstanceOf(APIList);
    expect(api.deviceSession(1)).toBeInstanceOf(APIResourceDeviceSession);
    expect(api.labelGroups()).toBeInstanceOf(APIList);
    expect(api.deviceStatistics()).toBeInstanceOf(APIList);
    expect(api.enums()).toBeInstanceOf(APIResource);
    expect(api.licenses()).toBeInstanceOf(APIResource);
    expect(api.labels()).toBeInstanceOf(APIList);
    expect(api.broker()).toBeInstanceOf(APIResourceBroker);
  });

});

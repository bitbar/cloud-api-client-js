import {API} from './API';
import {APIAdminResource} from './api/APIAdminResource';
import {APIList} from './api/APIList';
import {APIListDevices} from './api/APIListDevices';
import {APIListUsers} from './api/APIListUsers';
import {APIResource} from './api/APIResource';
import {APIResourceAccount} from './api/APIResourceAccount';
import {APIResourceBroker} from './api/APIResourceBroker';
import {APIResourceDevice} from './api/APIResourceDevice';
import {APIResourceDeviceGroup} from './api/APIResourceDeviceGroup';
import {APIResourceDeviceSession} from './api/APIResourceDeviceSession';
import {APIResourceUser} from './api/APIResourceUser';
import {APIResourceUserSession} from './api/APIResourceUserSession';

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
      expect((<any>api).axiosConfig.baseURL).not.toContain('/v2');
    });
  });

  it('should throw error if configuration is missing', () => {
    const config: any = undefined;
    expect(() => new API(config)).toThrow(new Error('config cannot be empty'));
  });

  it('should throw error if configuration is missing cloudUrl', () => {
    const config: any = {test: 123};
    expect(() => new API(config)).toThrow(new Error('cloudUrl cannot be empty'));
  });

  it('should throw error if configuration cloudUrl isn\'t a string', () => {
    const config: any = {cloudUrl: 123};
    expect(() => new API(config)).toThrow(new Error('cloudUrl must be a string'));
  });

  it('should throw error if configuration cloudUrl isn\'t a proper URL', () => {
    const config: any = {cloudUrl: 'test.com'};
    expect(() => new API(config)).toThrow(new Error(`cloudUrl doesn't look like a URL`));
  });

  it('should add /v2 to base url if config provided', () => {
    api = new API({
      baseURL: '',
      cloudUrl,
      v2: true
    });
    expect((<any>api).axiosConfig.baseURL).toContain('/v2');
  });

  it('should throw error if api key isn\'t a string', () => {
    const config: any = {
      baseURL: '',
      cloudUrl,
      apiKey: 123
    };
    expect(() => new API(config)).toThrow(new Error('apiKey must be a string'));
  });

  it('should throw error if api key isn\'t a proper key format', () => {
    const config: any = {
      baseURL: '',
      cloudUrl,
      apiKey: 'abc123'
    };
    expect(() => new API(config)).toThrow(new Error('apiKey is in the wrong format'));
  });

  it('should set apiKey as username auth', () => {
    const apiKey = 'qwertyuiopASDFGHJKL1234567890zXC';
    api = new API({
      baseURL: '',
      cloudUrl,
      apiKey
    });
    expect((<any>api).axiosConfig.auth).toEqual({
      username: apiKey,
      password: ''
    });
  });

  it('should set axios withCredentials is provided in config', () => {
    const apiKey = 'qwertyuiopASDFGHJKL1234567890zXC';
    api = new API({
      baseURL: '',
      cloudUrl,
      apiKey,
      withCredentials: true
    });
    expect((<any>api).axiosConfig.withCredentials).toEqual(true);
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

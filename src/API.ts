import axios, {AxiosInstance} from 'axios';
// @ts-ignore
import {version} from '../package.json';
import {APIAdminResource} from './api/APIAdminResource';
import {APIList} from './api/APIList';
import {APIListDevices} from './api/APIListDevices';
import {APIListUsers} from './api/APIListUsers';
import {APIResource} from "./api/APIResource";
import {APIResourceAccount} from './api/APIResourceAccount';
import {APIResourceBroker} from "./api/APIResourceBroker";
import {APIResourceDevice} from './api/APIResourceDevice';
import {APIResourceDeviceGroup} from './api/APIResourceDeviceGroup';
import {APIResourceDeviceSession} from "./api/APIResourceDeviceSession";
import {APIResourceUser} from './api/APIResourceUser';
import {APIResourceUserSession} from './api/APIResourceUserSession';
import {ApiConfig} from './ApiConfig';
import './finka';

if (globalThis.isNodeJs) {
  // Set User-Agent
  axios.defaults.headers.common['User-Agent'] = `Bitbar Cloud API Client for JavaScript v${version}`;
}

// Disable max content length
axios.defaults.maxContentLength = 1073741824; // 1GB


/**
 * API
 * Root for other API resources
 */
export class API {
  axios: AxiosInstance;

  private axiosConfig: ApiConfig = <ApiConfig>{};

  get baseUrl(): string {
    return this.axiosConfig.baseURL;
  }


  constructor(private config: ApiConfig) {
    if (config == null) {
      throw new Error('config cannot be empty');
    } else if (this.config.cloudUrl == null) {
      throw new TypeError('cloudUrl cannot be empty');
    } else if (typeof this.config.cloudUrl !== 'string') {
      throw new TypeError('cloudUrl must be a string');
    } else if (!/^https?:\/\/.{2,}/.test(this.config.cloudUrl)) {
      throw new Error("cloudUrl doesn't look like a URL");
    }

    // Validate and correct cloudUrl if needed
    this.axiosConfig.baseURL = this.config.cloudUrl.replace(/\/+$/, '') + '/api'

    // Check v2
    this.config.v2 = !!this.config.v2;
    if (this.config.v2) {
      this.axiosConfig.baseURL += '/v2';
    }

    // Check if apiKey is set
    if (this.config.apiKey) {
      if (typeof this.config.apiKey !== 'string') {
        throw new TypeError('apiKey must be a string');
      } else if (!/^[A-Za-z0-9]{32}$/.test(this.config.apiKey)) {
        throw new Error("apiKey is in the wrong format");
      }

      this.axiosConfig.auth = {
        username: <string>this.config.apiKey,
        password: ''
      };
    }

    // With credentials
    this.axiosConfig.withCredentials = config.withCredentials == null ? false : config.withCredentials;

    // Create axios instance
    this.axios = axios.create(this.axiosConfig);
  }


  // --- Resources starts here --- //

  // /account/{id}
  account(id: number) {
    return new APIResourceAccount(this, id);
  }

  // /admin
  admin() {
    return new APIAdminResource(this);
  }

  broker() {
    return new APIResourceBroker(this);
  }

  // /devices/{id}
  device(id: number) {
    return new APIResourceDevice(this, id);
  }

  // /device-groups/{id}
  deviceGroup(id: number) {
    return new APIResourceDeviceGroup(this, id);
  }

  // /device-groups
  deviceGroups() {
    return new APIList(this).push('device-groups');
  }

  // /devices
  devices() {
    return new APIListDevices(this);
  }

  // /device-sessions/{id}
  deviceSession(id: number) {
    return new APIResourceDeviceSession(this, id);
  }

  // /device-sessions
  deviceSessions() {
    return new APIList(this).push('device-sessions');
  }

  // /device-statistics
  deviceStatistics() {
    return new APIList(this).push('device-statistics');
  }

  // /enums
  enums() {
    return new APIResource(this).push('enums');
  }

  // /label-groups
  labelGroups() {
    return new APIList(this).push('label-groups');
  }

  // /labels
  labels() {
    return new APIList(this).push('labels');
  }

  // /licenses
  licenses() {
    return new APIResource(this).push('licenses');
  }

  // /me
  me() {
    return this.user('me');
  }

  // /user/{id}
  user(id: number | 'me') {
    return new APIResourceUser(this, id);
  }

  // /users
  users() {
    return new APIListUsers(this);
  }

  // /user-sessions
  userSession() {
    return new APIResourceUserSession(this);
  }

}


export default API;

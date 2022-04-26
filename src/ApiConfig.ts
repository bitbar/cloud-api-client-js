import {AxiosBasicCredentials} from 'axios';

export type ApiConfig = {

  /**
   * Base URL
   */
  baseURL: string;

  /**
   * Cloud URL
   */
  cloudUrl: string;

  /**
   * v2 Flag
   * Tells if should be used v2 or not
   */
  v2?: boolean;

  /**
   * API Key
   * You can get one by logging in into UI and finding it in My Account view
   */
  apiKey?: string;

  /**
   * Auth
   *
   */
  auth?: AxiosBasicCredentials;


  /**
   * With credentials?
   *
   */
  withCredentials?: boolean;
}

export default ApiConfig;

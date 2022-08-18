import {AxiosRequestConfig, AxiosResponse, Method} from 'axios';
import {stringify} from 'qs';
import {API} from '../API';
import {ALLOWED_HTTP_METHODS, QueryParams} from './models/HTTP';

export type NoData = void;

/**
 * @typeParam RESPONSE        HTTP Response return type.
 * @typeParam QUERY_PARAMS    Allowed Query Params
 * @typeParam DATA Allowed    Data Object
 */
export class APIEntity<RESPONSE = any, QUERY_PARAMS extends QueryParams | void = QueryParams, DATA = any> {

  root: API;

  protected stack: Array<string | number> = [];
  protected requestConfig: AxiosRequestConfig = {};
  protected ALLOWED_HTTP_METHODS: Array<Method> = ALLOWED_HTTP_METHODS;

  /**
   * Constructor
   * @param {APIEntity|object} [parent] - Specifies a parent from which should be inherited properties
   */
  constructor(parent: APIEntity<RESPONSE> | API) {
    if (parent instanceof APIEntity) {
      this.root = parent.root;

      if (Array.isArray(parent.stack)) { //???
        this.push(...parent.stack);
      }

      if (parent.requestConfig != null) {
        this.setRequestConfig(parent.requestConfig);
      }
    } else {
      this.root = parent;
    }
  }

  push(...items: Array<string | number>): this {
    this.stack = this.stack.concat(items);
    return this;
  }

  shift(): this {
    this.stack.shift();
    return this;
  }

  restack(...items: Array<string | number>): this {
    this.stack = items;
    return this;
  }

  /**
   * Get first element of the stack
   */
  get first(): string | number {
    return this.stack[0];
  }

  /**
   * Get last element of the stack
   */
  get last(): string | number {
    return this.stack[this.stack.length - 1];
  }

  /**
   * Set last element of the stack
   */
  set last(val) {
    this.stack[this.stack.length - 1] = val;
  }

  toUrl(absolute = false): string {
    let url = `/${this.stack.join('/')}`;

    if (absolute) {
      url = this.root.baseUrl + url;
    }

    return url;
  }

  setRequestConfig(requestConfig: AxiosRequestConfig): this {
    Object.deepAssign(this.requestConfig, requestConfig);
    return this;
  }

  removeRequestConfig(key: keyof AxiosRequestConfig): this {
    delete this.requestConfig[key];
    return this;
  }

  headers(headers: Record<string, string>): this {
    const _headers: Record<string, string> = {};

    // Unify/Standarize headers keys
    for (const key in headers) {
      const newKey = key.replace(/(?:^|-)([a-z])/g, (letter) => letter.toUpperCase());
      _headers[newKey] = headers[key];
    }

    return this.setRequestConfig({
      headers: _headers
    });
  }

  /**
   * Set HTTP method
   */
  method(name: Method): this {
    const NAME: Uppercase<Method> = <Uppercase<Method>>name.toLocaleUpperCase();
    const isAllowed: boolean = this.ALLOWED_HTTP_METHODS.indexOf(NAME) > -1;

    if (!isAllowed) {
      throw new Error(`Method '${NAME}' is not allowed! You can use: ${this.ALLOWED_HTTP_METHODS.join(', ')}`);
    }

    return this.setRequestConfig({
      method: NAME
    });
  }

  /**
   * Set GET as HTTP method
   */
  get(): this {
    return this.method('GET');
  }

  /**
   * Set POST as HTTP method
   */
  post(): this {
    return this.method('POST');
  }

  /**
   * Set params
   */
  params<T extends keyof QUERY_PARAMS = keyof QUERY_PARAMS>(params: Pick<QUERY_PARAMS, T>): this {
    Object.deepAssign(this.requestConfig, {
      params
    });
    return this;
  }

  getParams(): Partial<QUERY_PARAMS> {
    return this.requestConfig.params == null ? {} : this.requestConfig.params;
  }

  removeParam(key: keyof QUERY_PARAMS): this {
    delete this.requestConfig.params[key];
    return this;
  }

  /**
   * Set data
   */
  data(data: DATA): this {
    Object.deepAssign(this.requestConfig, {
      data
    });
    return this;
  }

  /**
   * Set JSON data
   */
  jsonData(data: DATA): this {
    this.headers({
      'Content-Type': 'application/json'
    }).data(data);
    return this;
  }

  /**
   * Set form data
   */
  formData(data: DATA): this {
    this.headers({
      'Content-Type': 'multipart/form-data'
    }).data(data);
    return this;
  }

  /**
   * Send request
   */
  send<T = RESPONSE>(): Promise<AxiosResponse<T>> {
    const requestConfig = <AxiosRequestConfig>Object.deepAssign({}, this.requestConfig, {
      url: `/${this.stack.join('/')}`
    });

    // Set default headers
    if (requestConfig.headers == null) {
      requestConfig.headers = {};
    }

    // Set default Content-Type
    if (requestConfig.headers['Content-Type'] == null) {
      requestConfig.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
    }

    // Convert data if needed
    if (requestConfig.method === 'POST' &&
      (<string>requestConfig.headers['Content-Type']).startsWith('application/x-www-form-urlencoded') &&
      requestConfig.data != null) {
      requestConfig.data = this.paramsSerializer(requestConfig.data);
    }

    if (requestConfig.params) {
      requestConfig.paramsSerializer = this.paramsSerializer;
    }

    // Send request
    return this.root.axios.request<T>(requestConfig);
  }

  protected paramsSerializer(params: DATA | QUERY_PARAMS): string {
    return stringify(params, {
      arrayFormat: 'brackets'
    });
  }
}


export default APIEntity;

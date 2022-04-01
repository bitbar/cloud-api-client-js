import {AxiosRequestConfig, AxiosResponse, Method} from 'axios';
import {stringify} from 'qs';
import {API} from "../API";


/**
 * Allowed methods
 *
 * @constant
 * @type {Array}
 * @default
 */
enum ALLOWED_HTTP_METHODS {
  GET = 'GET',
  POST = 'POST',
  DELETE = 'DELETE'
}


/**
 * APIEntity
 *
 * @class
 * @abstract
 */
export class APIEntity<T = any, P = T> {

  /**
   * Stack
   *
   * @public
   * @type {Array}
   */
  protected stack: Array<string | number> = [];

  /**
   * object of request config
   *
   * @protected
   * @type {AxiosRequestConfig}
   */
  protected requestConfig: AxiosRequestConfig = {};

  /**
   * Root
   *
   * @public
   * @type {API}
   */
  public root: API;

  /**
   * Constructor
   * @param {APIEntity|object} [parent] - Specifies a parent from which should be inherited properties
   */
  constructor(parent: APIEntity<P> | API) {
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

  /**
   * Push
   *
   * @public
   * @param {string|number} items... - Items that should be pushed to stack
   * @returns this
   */
  public push(...items: Array<string | number>) {
    this.stack = this.stack.concat(items);
    return this;
  }

  /**
   * Shift
   *
   * @public
   * @return this
   */
  public shift() {
    this.stack.shift();
    return this;
  }

  /**
   * Restack
   *
   * @public
   * @returns this
   */
  public restack(...items: Array<string | number>): this {
    this.stack = items;
    return this;
  }

  /**
   * Get first element of the stack
   */
  public get first() {
    return this.stack[0];
  }

  /**
   * Get last element of the stack
   */
  public get last() {
    return this.stack[this.stack.length - 1];
  }

  /**
   * Set last element of the stack
   */
  public set last(val) {
    this.stack[this.stack.length - 1] = val;
  }

  /**
   * To URL
   *
   * @param {boolean} absolute
   * @returns string
   */
  public toUrl(absolute = false): string {
    let url = `/${this.stack.join('/')}`;

    if (absolute) {
      url = this.root.baseUrl + url;
    }

    return url;
  }

  /**
   * Set request config
   *
   * @public
   * @param {AxiosRequestConfig} requestConfig - object of request config to be set
   * @returns this
   */
  public setRequestConfig(requestConfig: AxiosRequestConfig): this {
    Object.deepAssign(this.requestConfig, requestConfig);
    return this;
  }

  /**
   * Remove request config key
   *
   * @public
   * @param {string} key - Key to me removed from request config
   * @returns this
   */
  public removeRequestConfig(key: keyof AxiosRequestConfig): this {
    delete this.requestConfig[key];
    return this;
  }

  /**
   * Set headers
   *
   * @public
   * @param {object} headers - Headers object
   * @returns this
   */
  public headers(headers: Record<string, string>): this {
    const _headers: Record<string, string> = {};

    // Unify/Standarize headers keys
    for (const key in headers) {
      const newKey = key.replace(/(?:^|-)([a-z])/g, (letter) => letter.toUpperCase());
      _headers[newKey] = headers[key];
    }

    // Set
    return this.setRequestConfig({
      headers: _headers
    });
  }

  /**
   * Set HTTP method
   *
   * @public
   * @param {string} name - HTTP methods name
   * @returns this
   */
  public method(name: Method): this {
    const NAME: Uppercase<Method> = <Uppercase<Method>>name.toLocaleUpperCase();
    const isAllowed: boolean = Object.keys(ALLOWED_HTTP_METHODS).indexOf(NAME) > -1;

    if (!isAllowed) {
      throw new Error(`Method '${NAME}' is not allowed! You can use: ${Object.keys(ALLOWED_HTTP_METHODS).join(', ')}`);
    }

    return this.setRequestConfig({
      method: NAME
    });
  }

  /**
   * Set GET as HTTP method
   *
   * @public
   * @returns this
   */
  public get(): this {
    return this.method('GET');
  }

  /**
   * Set POST as HTTP method
   *
   * @public
   * @returns this
   */
  public post(): this {
    return this.method('POST');
  }

  /**
   * Set params
   *
   * @public
   * @param {object} params - object of params to be set
   * @returns this
   */
  public params(params: object): this {
    Object.deepAssign(this.requestConfig, {
      params
    });
    return this;
  }

  /**
   * Get params
   *
   * @public
   * @returns object
   */
  public getParams(): Record<string, any> {
    return this.requestConfig.params == null ? {} : this.requestConfig.params;
  }

  /**
   * Remove params key
   *
   * @public
   * @param {string} key - Key to me removed from params
   * @returns this
   */
  public removeParam(key: string): this {
    delete this.requestConfig.params[key];
    return this;
  }

  /**
   * Set data
   *
   * @public
   * @param {Record<string, any>} data - object of data to be set
   * @returns this
   */
  public data(data: Record<string, any>): this {
    Object.deepAssign(this.requestConfig, {
      data
    });
    return this;
  }

  /**
   * Set JSON data
   *
   * @public
   * @param {Record<string, any>} data - JSON object to be set
   * @returns this
   */
  public jsonData(data: Record<string, any>): this {
    this.headers({
      'Content-Type': 'application/json'
    }).data(data);
    return this;
  }

  /**
   * Set form data
   *
   * @public
   * @param {FormData} data - JSON object to be set
   * @returns this
   */
  public formData(data: FormData): this {
    this.headers({
      'Content-Type': 'multipart/form-data'
    }).data(data);
    return this;
  }

  /**
   * Custom params serializer
   * @private
   * @param {Record<string, any>} params
   */
  private static paramsSerializer(params: Record<string, any>): string {
    return stringify(params, {
      arrayFormat: 'brackets'
    });
  }

  /**
   * Send request
   *
   * @public
   * @returns Promise
   */
  public send(): Promise<AxiosResponse<T>> {
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
      requestConfig.data = stringify(requestConfig.data, {
        arrayFormat: 'brackets'
      });
    }

    if (requestConfig.params) {
      requestConfig.paramsSerializer = APIEntity.paramsSerializer;
    }

    // Send request
    return this.root.axios.request<T>(requestConfig);
  }
}


export default APIEntity;

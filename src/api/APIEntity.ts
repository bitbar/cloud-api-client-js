import qs from 'qs';
import { AxiosRequestConfig, Method } from 'axios';


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
};


/**
 * APIEntity
 *
 * @class
 * @abstract
 */
class APIEntity {

  /**
   * Stack
   *
   * @public
   * @type {Array}
   */
  public stack: Array<string|number>;

  /**
   * object of request config
   *
   * @protected
   * @type {AxiosRequestConfig}
   */
  protected requestConfig: AxiosRequestConfig;

  /**
   * Root
   *
   * @public
   * @type {API}
   */
  public root: object;

  /**
   * Constructor
   * @param {APIEntity|object} [parent] - Specifies a parent from which should be inherited properties
   */
  constructor (parent: APIEntity | object) {
    this.stack = [];
    this.requestConfig = {};

    if (parent instanceof APIEntity) {
      this.root = parent.root;

      if (Array.isArray(parent.stack)) {
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
  public push (...items: Array<string|number>) {
    for (const item of items) {
      this.stack.push(item);
    }
    return this;
  }

  /**
   * Pop
   *
   * @public
   * @return this
   */
  public pop () {
    this.stack.pop();
    return this;
  }

  /**
   * Shift
   *
   * @public
   * @return this
   */
  public shift () {
    this.stack.shift();
    return this;
  }

  /**
   * Unshift
   *
   * @public
   * @return this
   */
   public unshift (...items: Array<string|number>) {
    for (const item of items) {
      this.stack.unshift(item);
    }
    return this;
  }

  public restack (...items: Array<string|number>) {
    this.stack = items;
    return this;
  }

  /**
   * Get first element of the stack
   */
  public get first () {
    return this.stack[0];
  }

  /**
   * Set first element of the stack
   */
  public set first (val) {
    this.stack[0] = val;
  }

  /**
   * Get last element of the stack
   */
  public get last () {
    return this.stack[this.stack.length - 1];
  }

  /**
   * Set last element of the stack
   */
  public set last (val) {
    this.stack[this.stack.length - 1] = val;
  }

  /**
   * To URL
   *
   * @param {boolean} absolute
   */
  public toUrl (absolute = false) {
    let url = `/${this.stack.join('/')}`;

    if (absolute) {
      // @ts-ignore
      url = this.root.axiosConfig.baseURL + url;
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
  public setRequestConfig (requestConfig: AxiosRequestConfig) {
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
  public removeRequestConfig (key: string) {
    // @ts-ignore
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
  public headers (headers: object) {
    const _headers = {};

    // Unify/Standarize headers keys
    for (const key in headers) {
      const newKey = key.replace(/(?:^|-)([a-z])/g, (letter) => letter.toUpperCase());
      // @ts-ignore
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
  public method (name: Method) {
    const NAME: Method = <Method> name.toLocaleUpperCase();

    // @ts-ignore
    if (!ALLOWED_HTTP_METHODS[NAME]) {
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
  public get () {
    return this.method('GET');
  }

  /**
   * Set POST as HTTP method
   *
   * @public
   * @returns this
   */
  public post () {
    return this.method('POST');
  }

  /**
   * Set params
   *
   * @public
   * @param {object} params - object of params to be set
   * @returns this
   */
  public params (params: object) {
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
  public getParams () {
    return this.requestConfig.params == null ? {} : this.requestConfig.params;
  }

  /**
   * Remove params key
   *
   * @public
   * @param {string} key - Key to me removed from params
   * @returns this
   */
  public removeParam (key: string) {
    delete this.requestConfig.params[key];
    return this;
  }

  /**
   * Set data
   *
   * @public
   * @param {object} data - object of data to be set
   * @returns this
   */
  public data (data: object) {
    Object.deepAssign(this.requestConfig, {
      data
    });
    return this;
  }

  /**
   * Set JSON data
   *
   * @public
   * @param {object} data - JSON object to be set
   * @returns this
   */
  public jsonData (data: object) {
    this.headers({
      'Content-Type': 'application/json'
    }).data(data);
    return this;
  }

  /**
   * Set form data
   *
   * @public
   * @param {object} data - JSON object to be set
   * @returns this
   */
  public formData (data: FormData) {
    this.headers({
      'Content-Type': 'multipart/form-data'
    }).data(data);
    return this;
  }

  /**
   * Custom params serializer
   * @private
   * @param {object} params
   */
  private paramsSerializer (params: object) {
    return qs.stringify(params, {
      arrayFormat: 'brackets'
    });
  }

  /**
   * Send request
   *
   * @public
   * @returns Promise
   */
  public send () {
    const requestConfig = <AxiosRequestConfig> Object.deepAssign({}, this.requestConfig, {
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
    requestConfig.headers['Content-Type'].startsWith('application/x-www-form-urlencoded') &&
    requestConfig.data != null) {
      requestConfig.data = qs.stringify(requestConfig.data);
    }

    if (requestConfig.params) {
      requestConfig.paramsSerializer = this.paramsSerializer;
    }

    // Send request
    // @ts-ignore
    return this.root.axios.request(requestConfig);
  }
}


export default APIEntity;

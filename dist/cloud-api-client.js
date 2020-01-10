/* Bitbar Cloud API Client for JavaScript v0.8.0 | (c) Bitbar Technologies and contributors | https://github.com/bitbar/cloud-api-client-js/blob/master/LICENSE.md */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('finka'), require('axios'), require('qs')) :
  typeof define === 'function' && define.amd ? define(['finka', 'axios', 'qs'], factory) :
  (global = global || self, global['cloud-api-client-js'] = factory(global.finka, global.axios, global.qs));
}(this, (function (finka, axios, qs) { 'use strict';

  axios = axios && axios.hasOwnProperty('default') ? axios['default'] : axios;
  qs = qs && qs.hasOwnProperty('default') ? qs['default'] : qs;

  var version = "0.8.0";

  /*! *****************************************************************************
  Copyright (c) Microsoft Corporation. All rights reserved.
  Licensed under the Apache License, Version 2.0 (the "License"); you may not use
  this file except in compliance with the License. You may obtain a copy of the
  License at http://www.apache.org/licenses/LICENSE-2.0

  THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
  KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
  WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
  MERCHANTABLITY OR NON-INFRINGEMENT.

  See the Apache Version 2.0 License for specific language governing permissions
  and limitations under the License.
  ***************************************************************************** */
  /* global Reflect, Promise */

  var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return extendStatics(d, b);
  };

  function __extends(d, b) {
      extendStatics(d, b);
      function __() { this.constructor = d; }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  }

  /**
   * Allowed methods
   *
   * @constant
   * @type {Array}
   * @default
   */
  var ALLOWED_HTTP_METHODS;
  (function (ALLOWED_HTTP_METHODS) {
      ALLOWED_HTTP_METHODS["GET"] = "GET";
      ALLOWED_HTTP_METHODS["POST"] = "POST";
      ALLOWED_HTTP_METHODS["DELETE"] = "DELETE";
  })(ALLOWED_HTTP_METHODS || (ALLOWED_HTTP_METHODS = {}));
  /**
   * APIEntity
   *
   * @class
   * @abstract
   */
  var APIEntity = /** @class */ (function () {
      /**
       * Constructor
       * @param {APIEntity|object} [parent] - Specifies a parent from which should be inherited properties
       */
      function APIEntity(parent) {
          this.stack = [];
          this.requestConfig = {};
          if (parent instanceof APIEntity) {
              this.root = parent.root;
              if (Array.isArray(parent.stack)) {
                  this.push.apply(this, parent.stack);
              }
              if (parent.requestConfig != null) {
                  this.setRequestConfig(parent.requestConfig);
              }
          }
          else {
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
      APIEntity.prototype.push = function () {
          var items = [];
          for (var _i = 0; _i < arguments.length; _i++) {
              items[_i] = arguments[_i];
          }
          for (var _a = 0, items_1 = items; _a < items_1.length; _a++) {
              var item = items_1[_a];
              this.stack.push(item);
          }
          return this;
      };
      /**
       * Pop
       *
       * @public
       * @return this
       */
      APIEntity.prototype.pop = function () {
          this.stack.pop();
          return this;
      };
      /**
       * Set request config
       *
       * @public
       * @param {AxiosRequestConfig} requestConfig - object of request config to be set
       * @returns this
       */
      APIEntity.prototype.setRequestConfig = function (requestConfig) {
          Object.deepAssign(this.requestConfig, requestConfig);
          return this;
      };
      /**
       * Remove request config key
       *
       * @public
       * @param {string} key - Key to me removed from request config
       * @returns this
       */
      APIEntity.prototype.removeRequestConfig = function (key) {
          delete this.requestConfig[key];
          return this;
      };
      /**
       * Set headers
       *
       * @public
       * @param {object} headers - Headers object
       * @returns this
       */
      APIEntity.prototype.headers = function (headers) {
          var _headers = {};
          // Unify/Standarize headers keys
          for (var key in headers) {
              var newKey = key.replace(/(?:^|-)([a-z])/g, function (letter) { return letter.toUpperCase(); });
              _headers[newKey] = headers[key];
          }
          // Set
          return this.setRequestConfig({
              headers: _headers
          });
      };
      /**
       * Set HTTP method
       *
       * @public
       * @param {string} name - HTTP methods name
       * @returns this
       */
      APIEntity.prototype.method = function (name) {
          var NAME = name.toLocaleUpperCase();
          if (!ALLOWED_HTTP_METHODS[NAME]) {
              throw new Error("Method '" + NAME + "' is not allowed! You can use: " + Object.keys(ALLOWED_HTTP_METHODS).join(', '));
          }
          return this.setRequestConfig({
              method: NAME
          });
      };
      /**
       * Set GET as HTTP method
       *
       * @public
       * @returns this
       */
      APIEntity.prototype.get = function () {
          return this.method('GET');
      };
      /**
       * Set POST as HTTP method
       *
       * @public
       * @returns this
       */
      APIEntity.prototype.post = function () {
          return this.method('POST');
      };
      /**
       * Set params
       *
       * @public
       * @param {object} params - object of params to be set
       * @returns this
       */
      APIEntity.prototype.params = function (params) {
          Object.deepAssign(this.requestConfig, {
              params: params
          });
          return this;
      };
      /**
       * Get params
       *
       * @public
       * @returns object
       */
      APIEntity.prototype.getParams = function () {
          return this.requestConfig.params == null ? {} : this.requestConfig.params;
      };
      /**
       * Remove params key
       *
       * @public
       * @param {string} key - Key to me removed from params
       * @returns this
       */
      APIEntity.prototype.removeParam = function (key) {
          delete this.requestConfig.params[key];
          return this;
      };
      /**
       * Set data
       *
       * @public
       * @param {object} data - object of data to be set
       * @returns this
       */
      APIEntity.prototype.data = function (data) {
          Object.deepAssign(this.requestConfig, {
              data: data
          });
          return this;
      };
      /**
       * Set JSON data
       *
       * @public
       * @param {object} data - JSON object to be set
       * @returns this
       */
      APIEntity.prototype.jsonData = function (data) {
          this.headers({
              'Content-Type': 'application/json'
          }).data(data);
          return this;
      };
      /**
       * Send request
       *
       * @public
       * @returns Promise
       */
      APIEntity.prototype.send = function () {
          var requestConfig = Object.deepAssign({}, this.requestConfig, {
              url: "/" + this.stack.join('/')
          });
          // Set default headers
          if (requestConfig.headers == null) {
              requestConfig.headers = {};
          }
          // Set default Content-Type
          if (requestConfig.headers['Content-Type'] == null) {
              requestConfig.headers['Content-Type'] = 'application/x-www-form-urlencoded';
          }
          // Convert data if needed
          if (requestConfig.method === 'POST' &&
              requestConfig.headers['Content-Type'] === 'application/x-www-form-urlencoded' &&
              requestConfig.data != null) {
              requestConfig.data = qs.stringify(requestConfig.data);
          }
          // Send request
          // @ts-ignore
          return this.root.axios.request(requestConfig);
      };
      return APIEntity;
  }());

  /**
   * Filter
   */
  var Filter = /** @class */ (function () {
      function Filter(name, value, operand) {
          this.name = name;
          this.value = value;
          this.operand = operand;
      }
      return Filter;
  }());

  /**
   * FilterBuilder
   *
   * Builds filter string according to Bitbar Cloud backend convention
   */
  var FilterBuilder = /** @class */ (function () {
      function FilterBuilder() {
          this.filters = [];
      }
      /**
       * Add filter to filters list
       * @param name {string} Name
       * @param value {*} Value
       * @param operand {string} Operand
       * @param [checkNull=false] {boolean} Check null?
       * @returns {FilterBuilder}
       */
      FilterBuilder.prototype.add = function (name, value, operand, checkNull) {
          if (checkNull === void 0) { checkNull = false; }
          value = Array.wrap(value);
          if (value.length === 0) {
              return this;
          }
          // auto-convert
          for (var i = 0; i < value.length; i++) {
              var v = value[i];
              if (typeof v === 'object' && v instanceof Date) {
                  value[i] = v.getTime();
              }
          }
          var isNull = false;
          if (checkNull) {
              // check null existence
              for (var _i = 0, value_1 = value; _i < value_1.length; _i++) {
                  var v = value_1[_i];
                  if (v !== null) {
                      continue;
                  }
              }
              if (isNull) {
                  value = value.filter(function (item) { return item !== null; });
                  operand += 'ornull';
              }
          }
          if (operand.endsWith('ornull') && value.length === 0) {
              operand = 'isnull';
          }
          // add filter
          this.filters.push(new Filter(name, value, operand));
          return this;
      };
      FilterBuilder.prototype.gt = function (name, value) {
          return this.add(name, value, 'gt');
      };
      FilterBuilder.prototype.lt = function (name, value) {
          return this.add(name, value, 'lt');
      };
      FilterBuilder.prototype.after = function (name, value) {
          return this.add(name, value, 'after', true);
      };
      FilterBuilder.prototype.afterorequal = function (name, value) {
          return this.add(name, value, 'afterorequal', true);
      };
      FilterBuilder.prototype.before = function (name, value) {
          return this.add(name, value, 'before', true);
      };
      FilterBuilder.prototype.beforeorequal = function (name, value) {
          return this.add(name, value, 'beforeorequal', true);
      };
      FilterBuilder.prototype.on = function (name, value) {
          return this.add(name, value, 'on');
      };
      FilterBuilder.prototype.eq = function (name, value) {
          return this.add(name, value, 'eq');
      };
      FilterBuilder.prototype.contains = function (name, value) {
          return this.add(name, value, 'contains');
      };
      FilterBuilder.prototype.like = function (name, value) {
          return this.add(name, value, 'like');
      };
      FilterBuilder.prototype.isnull = function (name) {
          return this.add(name, undefined, 'isnull');
      };
      FilterBuilder.prototype.in = function (name, value) {
          return this.add(name, value, 'in', true);
      };
      FilterBuilder.prototype.notin = function (name, value) {
          return this.add(name, value, 'notin', true);
      };
      FilterBuilder.prototype.raw = function (filter) {
          var filters = Array.wrap(filter);
          for (var _i = 0, filters_1 = filters; _i < filters_1.length; _i++) {
              var filter_1 = filters_1[_i];
              if (this.isFilterPart(filter_1)) {
                  this.filters.push(filter_1);
              }
              else {
                  throw new SyntaxError("Filter " + filter_1 + " has invalid syntax");
              }
          }
      };
      /**
       * Check if given string is proper filter part
       */
      FilterBuilder.prototype.isFilterPart = function (str) {
          return /^[a-zA-Z0-9.]{2,12}_(?:isnull$|(?:gt|lt|(?:after|before)(?:orequal)?|on|eq|contains|like|(?:not)?in)_)/.test(str);
      };
      /**
       * To string
       */
      FilterBuilder.prototype.toString = function () {
          var parts = [];
          var part, val;
          for (var _i = 0, _a = this.filters; _i < _a.length; _i++) {
              var filter = _a[_i];
              if (typeof filter === 'string') {
                  part = filter;
              }
              else {
                  val = '';
                  if (filter.value.length > 1 || typeof filter.value[0] !== 'undefined') {
                      val = "_" + filter.value.join('|');
                  }
                  part = filter.name + "_" + filter.operand + val;
              }
              parts.push(part);
          }
          return parts.join(';');
      };
      return FilterBuilder;
  }());

  /**
   * Default limit
   *
   * @constant
   * @type {number}
   * @default
   */
  var DEFAULT_LIMIT = 20;
  /**
   * Default offset
   *
   * @constant
   * @type {number}
   * @default
   */
  var DEFAULT_OFFSET = 0;
  /**
   * API Order Enum
   */
  var APIOrder;
  (function (APIOrder) {
      APIOrder["asc"] = "a";
      APIOrder["desc"] = "d";
  })(APIOrder || (APIOrder = {}));
  /**
   * APIList
   *
   * @class
   * @extends APIEntity
   */
  var APIList = /** @class */ (function (_super) {
      __extends(APIList, _super);
      function APIList() {
          return _super !== null && _super.apply(this, arguments) || this;
      }
      /**
       * Create
       * Shortcut for sending data POST
       *
       * @param {object} data
       */
      APIList.prototype.create = function (data) {
          return this.post().data(data).send();
      };
      /**
       * Sets sorting
       *
       * @public
       * @param {string} name - Name of the column according to which the data will be sorted
       * @param {string} [order=a] - Sorting order. Possibilities: 'a', 'd'
       * @returns this
       */
      APIList.prototype.sort = function (name, order) {
          // if order not in ['a', 'd']
          //   throw new Error(`Order '\${order}' is invalid! Use 'a' for ascending or 'd' for descending.`);
          if (order === void 0) { order = APIOrder.asc; }
          return this.params({
              sort: name + "_" + order
          });
      };
      /**
       * Sets limit
       *
       * @public
       * @param {number} [limit=DEFAULT_LIMIT] - Limit to be set
       * @returns this
       */
      APIList.prototype.limit = function (limit) {
          if (limit === void 0) { limit = DEFAULT_LIMIT; }
          if (!Number.isNatural(limit)) {
              throw new Error("Limit '" + limit + "' is invalid!");
          }
          return this.params({
              limit: limit
          });
      };
      /**
       * Gets limit
       *
       * @public
       * @returns number
       */
      APIList.prototype.getLimit = function () {
          var params = this.getParams();
          return params.limit == null ? DEFAULT_LIMIT : params.limit;
      };
      /**
       * Disables limit
       *
       * @public
       * @returns this
       */
      APIList.prototype.noLimit = function () {
          return this.limit(0);
      };
      /**
       * Sets offset
       *
       * @public
       * @param {number} [offset=DEFAULT_OFFSET] - Offset to be set
       * @returns this
       */
      APIList.prototype.offset = function (offset) {
          if (offset === void 0) { offset = DEFAULT_OFFSET; }
          if (!Number.isNatural(offset)) {
              throw new Error("Offset '" + offset + "' is invalid!");
          }
          return this.params({
              offset: offset
          });
      };
      /**
       * Sets limit and offset so that will request from BE records between range
       *
       * @public
       * @param {number} from - From index
       * @param {number} to - To index
       * @returns this
       */
      APIList.prototype.between = function (from, to) {
          if (!Number.isNatural(from)) {
              throw new Error("From '" + from + "' is invalid!");
          }
          if (!Number.isNatural(to)) {
              throw new Error("To '" + to + "' is invalid!");
          }
          return this.params({
              offset: from,
              limit: 1 + (to - from)
          });
      };
      /**
       * Sets limit and offset so that will request from BE one record on given index
       *
       * @public
       * @param {number} idx - Index
       * @returns this
       */
      APIList.prototype.only = function (idx) {
          if (!Number.isNatural(idx)) {
              throw new Error("Index '" + idx + "' is invalid!");
          }
          return this.params({
              offset: idx,
              limit: 1
          });
      };
      /**
       * Gets current limit and sets offset so that will request from BE one page of records
       *
       * @public
       * @param {number} [page=1] - Page number (counted from 1)
       * @returns this
       */
      APIList.prototype.page = function (page) {
          if (page === void 0) { page = 1; }
          if (!Number.isNatural(page) || page == 0) {
              throw new Error("Page '" + page + "' is invalid!");
          }
          var limit = this.getLimit();
          var offset = (page - 1) * limit;
          return this.params({
              offset: offset,
              limit: limit
          });
      };
      /**
       * Sets search
       *
       * query param is working like SQL LIKE. BE sets wraps around query with %, and replaces every white character
       * with %. So e.g. if query='my device', then it's searching for '%my%device%' in DB.
       *
       * @public
       * @param {string} query - Query to search for
       * @returns this
       */
      APIList.prototype.search = function (query) {
          if (typeof query !== 'string') {
              throw new Error('Search query must be a string!');
          }
          return this.params({
              search: query
          });
      };
      /**
       * Sets filter
       *
       * @public
       * @param {FilterBuilder|string} filter - Filter
       * @returns this
       */
      APIList.prototype.filter = function (filter) {
          var isFilterBuilder = filter instanceof FilterBuilder;
          if (typeof filter !== 'string' && !isFilterBuilder) {
              throw new Error('Filter must be either string or instance of FilterBuilder');
          }
          if (isFilterBuilder) {
              filter = filter.toString();
          }
          return this.params({
              filter: filter
          });
      };
      return APIList;
  }(APIEntity));

  /**
   * APIResource
   *
   * @class
   * @extends APIEntity
   */
  var APIResource = /** @class */ (function (_super) {
      __extends(APIResource, _super);
      function APIResource() {
          return _super !== null && _super.apply(this, arguments) || this;
      }
      /**
       * Set DELETE as HTTP method
       *
       * @public
       * @returns this
       */
      APIResource.prototype.delete = function () {
          this.method('DELETE');
      };
      return APIResource;
  }(APIEntity));

  /**
   * APIListDevices
   *
   * @class
   * @extends APIList
   */
  var APIListDevices = /** @class */ (function (_super) {
      __extends(APIListDevices, _super);
      /**
       * /devices
       *
       * Constructor
       */
      function APIListDevices(parent) {
          var _this = _super.call(this, parent) || this;
          _this.push('devices');
          return _this;
      }
      // /devices/filters
      APIListDevices.prototype.filters = function () {
          return new APIResource(this).push('filters');
      };
      // /devices/cleanup-configurations
      APIListDevices.prototype.cleanupConfigurations = function () {
          return new APIList(this).push('cleanup-configurations');
      };
      /**
       * /devices/cleanup-configurations/{id}
       *
       * @param {number} id - Resource ID
       */
      APIListDevices.prototype.cleanupConfiguration = function (id) {
          if (id == null) {
              throw new Error('Resource ID cannot be null!');
          }
          return new APIResource(this).push('cleanup-configurations', id);
      };
      return APIListDevices;
  }(APIList));

  /**
   * APIListDevices
   *
   * @class
   * @extends APIList
   */
  var APIListUsers = /** @class */ (function (_super) {
      __extends(APIListUsers, _super);
      /**
       * /users
       *
       * Constructor
       */
      function APIListUsers(parent) {
          var _this = _super.call(this, parent) || this;
          _this.push('users');
          return _this;
      }
      // /users/activate
      APIListUsers.prototype.activate = function () {
          return new APIResource(this).push('activate');
      };
      // /users/recoveries
      APIListUsers.prototype.recoveries = function () {
          return new APIResource(this).push('recoveries');
      };
      // /users/passwordRecovery
      APIListUsers.prototype.passwordRecovery = function () {
          return new APIResource(this).push('password-recovery');
      };
      // /users/resetApiKey
      APIListUsers.prototype.resetApiKey = function () {
          return new APIResource(this).push('reset-api-key');
      };
      // /users/resetApiKey
      APIListUsers.prototype.validateVatId = function () {
          return new APIResource(this).push('validateVatId');
      };
      return APIListUsers;
  }(APIList));

  /**
   * APIResourceBillingPeriod
   *
   * @class
   * @extends APIResource
   */
  var APIResourceBillingPeriod = /** @class */ (function (_super) {
      __extends(APIResourceBillingPeriod, _super);
      /**
       * /billing-periods/{id}
       *
       * Constructor
       */
      function APIResourceBillingPeriod(parent, id) {
          var _this = this;
          if (id == null) {
              throw new Error('Resource ID cannot be null!');
          }
          _this = _super.call(this, parent) || this;
          _this.push('billing-periods', id);
          return _this;
      }
      // /billing-periods/{id}/receipt
      APIResourceBillingPeriod.prototype.receipt = function () {
          return new APIResource(this).push('receipt');
      };
      return APIResourceBillingPeriod;
  }(APIResource));

  /**
   * APIResourceBuild
   *
   * @class
   * @extends APIResource
   */
  var APIResourceBuild = /** @class */ (function (_super) {
      __extends(APIResourceBuild, _super);
      /**
       * /builds/{id}
       *
       * Constructor
       */
      function APIResourceBuild(parent, id) {
          var _this = this;
          if (id == null) {
              throw new Error('Resource ID cannot be null!');
          }
          _this = _super.call(this, parent) || this;
          _this.push('builds', id);
          return _this;
      }
      // /builds/{id}/abort
      APIResourceBuild.prototype.abort = function () {
          return new APIResource(this).push('abort');
      };
      // /builds/{id}/output-file-set/files
      APIResourceBuild.prototype.outputFiles = function () {
          return new APIList(this).push('output-file-set', 'files');
      };
      return APIResourceBuild;
  }(APIResource));

  /**
   * APIResourceFile
   *
   * @class
   * @extends APIResource
   */
  var APIResourceJob = /** @class */ (function (_super) {
      __extends(APIResourceJob, _super);
      /**
       * /jobs/{id}
       *
       * Constructor
       */
      function APIResourceJob(parent, id) {
          var _this = this;
          if (id == null) {
              throw new Error('Resource ID cannot be null!');
          }
          _this = _super.call(this, parent) || this;
          _this.push('jobs', id);
          return _this;
      }
      // /jobs/{id}/builds
      APIResourceJob.prototype.builds = function () {
          return new APIList(this).push('builds');
      };
      // /jobs/{id}/builds/{id}
      APIResourceJob.prototype.build = function (id) {
          return new APIResourceBuild(this, id);
      };
      return APIResourceJob;
  }(APIResource));

  /**
   * APIResourceBillingPeriod
   *
   * @class
   * @extends APIResource
   */
  var APIResourceDeviceGroup = /** @class */ (function (_super) {
      __extends(APIResourceDeviceGroup, _super);
      /**
       * /device-groups/{id}
       *
       * Constructor
       */
      function APIResourceDeviceGroup(parent, id) {
          var _this = this;
          if (id == null) {
              throw new Error('Resource ID cannot be null!');
          }
          _this = _super.call(this, parent) || this;
          _this.push('device-groups', id);
          return _this;
      }
      // /device-groups/{id}/devices
      APIResourceDeviceGroup.prototype.devices = function () {
          return new APIList(this).push('devices');
      };
      // /device-groups/{id}/device/{id}
      APIResourceDeviceGroup.prototype.device = function (id) {
          if (id == null) {
              throw new Error('Resource ID cannot be null!');
          }
          return new APIResource(this).push('devices', id);
      };
      // /device-groups/{id}/selectors
      APIResourceDeviceGroup.prototype.selectors = function () {
          return new APIList(this).push('selectors');
      };
      // /device-groups/{id}/selectors/{id}
      APIResourceDeviceGroup.prototype.selector = function (id) {
          if (id == null) {
              throw new Error('Resource ID cannot be null!');
          }
          return new APIResource(this).push('selectors', id);
      };
      return APIResourceDeviceGroup;
  }(APIResource));

  /**
   * InputFileset
   *
   * @class
   * @extends APIResource
   */
  var InputFileset = /** @class */ (function (_super) {
      __extends(InputFileset, _super);
      /**
       * /input-file-set
       *
       * Constructor
       */
      function InputFileset(parent) {
          var _this = _super.call(this, parent) || this;
          _this.push('input-file-set');
          return _this;
      }
      // /input-file-set/files
      InputFileset.prototype.files = function () {
          return new APIList(this).push('files');
      };
      // /input-file-set/files.zip
      InputFileset.prototype.filesZip = function () {
          return new APIResource(this).push('files.zip');
      };
      return InputFileset;
  }(APIResource));

  // Create non-media files filter
  var NON_MEDIA_FILES_FILTER = new FilterBuilder();
  NON_MEDIA_FILES_FILTER.eq('state', 'READY');
  NON_MEDIA_FILES_FILTER.notin('mimetype', [
      // no images
      'image/png', 'image/jpg', 'image/jpeg', 'image/webp', 'image/gif',
      // no videos
      'video/mp4', 'video/avi', 'video/webm', 'video/ogg', 'video/mpeg'
  ]);
  /**
   * OutputFileset
   *
   * @class
   * @extends APIResource
   */
  var OutputFileset = /** @class */ (function (_super) {
      __extends(OutputFileset, _super);
      /**
       * /output-file-set
       *
       * Constructor
       */
      function OutputFileset(parent) {
          var _this = _super.call(this, parent) || this;
          _this.push('output-file-set');
          return _this;
      }
      // /output-file-set/files
      OutputFileset.prototype.files = function () {
          return new APIList(this).push('files');
      };
      // /output-file-set/files.zip
      OutputFileset.prototype.filesZip = function () {
          return new APIResource(this).push('files.zip');
      };
      // /output-file-set/screenshots
      OutputFileset.prototype.screenshots = function () {
          return new APIList(this).push('screenshots');
      };
      // /output-file-set/screenshots/{id}
      OutputFileset.prototype.screenshot = function (id) {
          if (id == null) {
              throw new Error('Resource ID cannot be null!');
          }
          return new APIResource(this).push('screenshots', id);
      };
      // /output-file-set/screenshots/{id}/file/{id}
      OutputFileset.prototype.screenshotFile = function (id) {
          this.screenshot(id).push('file');
      };
      // Filter files out by ready videos
      OutputFileset.prototype.videos = function () {
          this.files().params({
              filter: 's_state_eq_READY',
              tag: ['video']
          });
      };
      // Filter files out by non-media
      OutputFileset.prototype.nonMediaFiles = function () {
          return this.files().filter(NON_MEDIA_FILES_FILTER);
      };
      return OutputFileset;
  }(APIResource));

  /**
   * APIResourceDeviceSession
   *
   * @class
   * @extends APIResource
   */
  var APIResourceDeviceSession = /** @class */ (function (_super) {
      __extends(APIResourceDeviceSession, _super);
      /**
       * /device-sessions/{id}
       *
       * Constructor
       */
      function APIResourceDeviceSession(parent, id) {
          var _this = this;
          if (id == null) {
              throw new Error('Resource ID cannot be null!');
          }
          _this = _super.call(this, parent) || this;
          _this.push('device-sessions', id);
          return _this;
      }
      // /device-sessions/{id}/cluster-logs
      APIResourceDeviceSession.prototype.clusterLogs = function () {
          return new APIResource(this).push('cluster-logs');
      };
      // /device-sessions/{id}/data-availability
      APIResourceDeviceSession.prototype.dataAvailability = function () {
          return new APIResource(this).push('data-availability');
      };
      // /device-sessions/{id}/fixtures.zip
      APIResourceDeviceSession.prototype.fixturesZip = function () {
          return new APIResource(this).push('fixtures.zip');
      };
      // /device-sessions/{id}/junit.xml
      APIResourceDeviceSession.prototype.junitXml = function () {
          return new APIResource(this).push('junit.xml');
      };
      // /device-sessions/{id}/logs
      APIResourceDeviceSession.prototype.logs = function () {
          return new APIResource(this).push('logs');
      };
      // /device-sessions/{id}/performance
      APIResourceDeviceSession.prototype.performance = function () {
          return new APIResource(this).push('performance');
      };
      // /device-sessions/{id}/release
      APIResourceDeviceSession.prototype.release = function () {
          return new APIResource(this).push('release');
      };
      // /device-sessions/{id}/result-data.zip
      APIResourceDeviceSession.prototype.resultDataZip = function () {
          return new APIResource(this).push('result-data.zip');
      };
      // /device-sessions/{id}/screenshots
      APIResourceDeviceSession.prototype.screenshots = function () {
          return new APIList(this).push('screenshots');
      };
      // /device-sessions/{id}/screenshots/{id}
      APIResourceDeviceSession.prototype.screenshot = function (id) {
          if (id == null) {
              throw new Error('Resource ID cannot be null!');
          }
          return new APIResource(this).push('screenshots', id);
      };
      // /device-sessions/{id}/steps
      APIResourceDeviceSession.prototype.steps = function () {
          return new APIList(this).push('steps');
      };
      // /device-sessions/{id}/steps/{id}
      APIResourceDeviceSession.prototype.step = function (id) {
          if (id == null) {
              throw new Error('Resource ID cannot be null!');
          }
          return new APIResource(this).push('steps', id);
      };
      // /device-sessions/{id}/steps/current
      APIResourceDeviceSession.prototype.currentStep = function () {
          return this.step('current');
      };
      // /device-sessions/{id}/test-case-runs
      APIResourceDeviceSession.prototype.testCaseRuns = function () {
          return new APIList(this).push('test-case-runs');
      };
      // /device-sessions/{id}/retry
      APIResourceDeviceSession.prototype.retry = function () {
          return new APIResource(this).push('retry').post();
      };
      // /device-sessions/{id}/input-file-set
      APIResourceDeviceSession.prototype.input = function () {
          return new InputFileset(this);
      };
      // /device-sessions/{id}/output-file-set
      APIResourceDeviceSession.prototype.output = function () {
          return new OutputFileset(this);
      };
      // Alias for output().videos();
      APIResourceDeviceSession.prototype.videos = function () {
          return this.output().videos();
      };
      return APIResourceDeviceSession;
  }(APIResource));

  /**
   * APIResourceManualSession
   *
   * @class
   * @extends APIResourceDeviceSession
   */
  var APIResourceManualSession = /** @class */ (function (_super) {
      __extends(APIResourceManualSession, _super);
      function APIResourceManualSession() {
          return _super !== null && _super.apply(this, arguments) || this;
      }
      // /connections
      APIResourceManualSession.prototype.connections = function () {
          return new APIResource(this).push('connections');
      };
      return APIResourceManualSession;
  }(APIResourceDeviceSession));

  /**
   * APIResourceRun
   *
   * @class
   * @extends APIResource
   */
  var APIResourceRun = /** @class */ (function (_super) {
      __extends(APIResourceRun, _super);
      /**
       * /runs/{id}
       *
       * Constructor
       */
      function APIResourceRun(parent, id) {
          var _this = this;
          if (id == null) {
              throw new Error('Resource ID cannot be null!');
          }
          _this = _super.call(this, parent) || this;
          _this.push('runs', id);
          return _this;
      }
      // /runs/{id}/config
      APIResourceRun.prototype.config = function () {
          return new APIResource(this).push('config');
      };
      // /runs/{id}/device-sessions
      APIResourceRun.prototype.deviceSessions = function () {
          return new APIList(this).push('device-sessions');
      };
      // /runs/{id}/device-sessions/{id}
      APIResourceRun.prototype.deviceSession = function (id) {
          return new APIResourceDeviceSession(this, id);
      };
      // /runs/{id}/steps
      APIResourceRun.prototype.steps = function () {
          return new APIList(this).push('steps');
      };
      // /runs/{id}/files
      APIResourceRun.prototype.files = function () {
          return new APIList(this).push('files');
      };
      // /runs/{id}/files.zip
      APIResourceRun.prototype.filesZip = function () {
          return new APIResource(this).push('files.zip');
      };
      // /runs/{id}/tags
      APIResourceRun.prototype.tags = function () {
          return new APIList(this).push('tags');
      };
      // /runs/{id}/tag
      APIResourceRun.prototype.tag = function (id) {
          if (id == null) {
              throw new Error('Resource ID cannot be null!');
          }
          return new APIResource(this).push('tags', id);
      };
      return APIResourceRun;
  }(APIResource));

  /**
   * APIResourceFile
   *
   * @class
   * @extends APIResource
   */
  var APIResourceProject = /** @class */ (function (_super) {
      __extends(APIResourceProject, _super);
      /**
       * /projects/{id}
       *
       * Constructor
       */
      function APIResourceProject(parent, id) {
          var _this = this;
          if (id == null) {
              throw new Error('Resource ID cannot be null!');
          }
          _this = _super.call(this, parent) || this;
          _this.push('projects', id);
          return _this;
      }
      // /projects/{id}/runs
      APIResourceProject.prototype.runs = function () {
          return new APIList(this).push('runs');
      };
      // /projects/{id}/runs/{id}
      APIResourceProject.prototype.run = function (id) {
          return new APIResourceRun(this, id);
      };
      // /projects/{id}/runs-extended
      APIResourceProject.prototype.runsExtended = function () {
          return new APIList(this).push('runs-extended');
      };
      // /projects/{id}/runs-extended/{id}
      APIResourceProject.prototype.runExtended = function (id) {
          if (id == null) {
              throw new Error('Resource ID cannot be null!');
          }
          return new APIResource(this).push('runs-extended', id);
      };
      // /projects/{id}/files
      APIResourceProject.prototype.files = function () {
          return new APIList(this).push('files');
      };
      // /projects/{id}/files.zip
      APIResourceProject.prototype.filesZip = function () {
          return new APIResource(this).push('files.zip');
      };
      // /projects/{id}/sharings
      APIResourceProject.prototype.sharings = function () {
          return new APIList(this).push('sharings');
      };
      // /projects/{id}/sharings/{id}
      APIResourceProject.prototype.sharing = function (id) {
          if (id == null) {
              throw new Error('Resource ID cannot be null!');
          }
          return new APIResource(this).push('sharings', id);
      };
      return APIResourceProject;
  }(APIResource));

  /**
   * APIResourceFile
   *
   * @class
   * @extends APIResource
   */
  var APIResourceFile = /** @class */ (function (_super) {
      __extends(APIResourceFile, _super);
      /**
       * /files/{id}
       *
       * Constructor
       */
      function APIResourceFile(parent, id) {
          var _this = this;
          if (id == null) {
              throw new Error('Resource ID cannot be null!');
          }
          _this = _super.call(this, parent) || this;
          _this.push('files', id);
          return _this;
      }
      // /files/{id}/file
      APIResourceFile.prototype.file = function () {
          return new APIResource(this).push('file');
      };
      // /files/{id}/icon
      APIResourceFile.prototype.icon = function () {
          return new APIResource(this).push('icon');
      };
      // /files/{id}/tags
      APIResourceFile.prototype.tags = function () {
          return new APIList(this).push('tags');
      };
      return APIResourceFile;
  }(APIResource));

  /**
   * APIResourceNotification
   *
   * @class
   * @extends APIResource
   */
  var APIResourceNotification = /** @class */ (function (_super) {
      __extends(APIResourceNotification, _super);
      /**
       * /notifications/{id}
       *
       * Constructor
       */
      function APIResourceNotification(parent, id) {
          var _this = this;
          if (id == null) {
              throw new Error('Resource ID cannot be null!');
          }
          _this = _super.call(this, parent) || this;
          _this.push('notifications', id);
          return _this;
      }
      // /notifications/{id}/test
      APIResourceNotification.prototype.test = function () {
          return new APIResource(this).push('test');
      };
      return APIResourceNotification;
  }(APIResource));

  /**
   * APIListDeviceTime
   *
   * @class
   * @extends APIList
   */
  var APIListDeviceTime = /** @class */ (function (_super) {
      __extends(APIListDeviceTime, _super);
      /**
       * /device-time
       *
       * Constructor
       */
      function APIListDeviceTime(parent) {
          var _this = _super.call(this, parent) || this;
          _this.push('device-time');
          return _this;
      }
      // /device-time/reserved
      APIListDeviceTime.prototype.reserved = function () {
          return new APIList(this).push('reserved');
      };
      // /device-time/used
      APIListDeviceTime.prototype.used = function () {
          return new APIList(this).push('used');
      };
      return APIListDeviceTime;
  }(APIList));

  /**
   * APIListFiles
   *
   * @class
   * @extends APIList
   */
  var APIListFiles = /** @class */ (function (_super) {
      __extends(APIListFiles, _super);
      // Constructor
      function APIListFiles(parent) {
          var _this = _super.call(this, parent) || this;
          _this.push('files');
          return _this;
      }
      // Siplifies process of uploading
      APIListFiles.prototype.upload = function (obj) {
          var form;
          // For NodeJS
          if (globalThis.isNodeJs) {
              var fs = require('fs');
              var FormData = require('form-data');
              form = new FormData();
              form.append('file', fs.createReadStream(obj.dir + '/' + obj.filename), {
                  filename: obj.filename
              });
              /**
               * Browser
               * @todo
               */
          }
          else {
              throw new Error('Not supported yet!');
          }
          this.post().headers(form.getHeaders()).data(form);
      };
      return APIListFiles;
  }(APIList));

  /**
   * APIListPurchased
   *
   * @class
   * @extends APIList
   */
  var APIListPurchased = /** @class */ (function (_super) {
      __extends(APIListPurchased, _super);
      /**
       * /purchased
       *
       * Constructor
       */
      function APIListPurchased(parent) {
          var _this = _super.call(this, parent) || this;
          _this.push('purchased');
          return _this;
      }
      return APIListPurchased;
  }(APIList));

  /**
   * APIListServices
   *
   * @class
   * @extends APIList
   */
  var APIListServices = /** @class */ (function (_super) {
      __extends(APIListServices, _super);
      // Constructor
      function APIListServices(parent) {
          var _this = _super.call(this, parent) || this;
          _this.push('services');
          return _this;
      }
      // /services/purchased
      APIListServices.prototype.purchased = function () {
          return new APIListPurchased(this);
      };
      // /services/available
      APIListServices.prototype.available = function () {
          this.push('available');
      };
      return APIListServices;
  }(APIList));

  /**
   * APIListRuns
   *
   * @class
   * @extends APIList
   */
  var APIListRuns = /** @class */ (function (_super) {
      __extends(APIListRuns, _super);
      /**
       * /runs
       *
       * Constructor
       */
      function APIListRuns(parent) {
          var _this = _super.call(this, parent) || this;
          _this.push('runs');
          return _this;
      }
      // /runs/config
      APIListRuns.prototype.config = function () {
          return new APIResource(this).push('config');
      };
      return APIListRuns;
  }(APIList));

  /**
   * APIListNotifications
   *
   * @class
   * @extends APIList
   */
  var APIListNotifications = /** @class */ (function (_super) {
      __extends(APIListNotifications, _super);
      /**
       * /notifications
       * Constructor
       */
      function APIListNotifications(parent) {
          var _this = _super.call(this, parent) || this;
          _this.push('notifications');
          return _this;
      }
      // /notifications/scopes
      APIListNotifications.prototype.scopes = function () {
          return new APIList(this).push('scopes');
      };
      // /notifications/channels
      APIListNotifications.prototype.channels = function () {
          return new APIList(this).push('channels');
      };
      return APIListNotifications;
  }(APIList));

  /**
   * APIResourceUser
   *
   * @class
   * @extends APIResource
   */
  var APIResourceUser = /** @class */ (function (_super) {
      __extends(APIResourceUser, _super);
      /**
       * /users/{id} | /me
       *
       * Constructor
       */
      function APIResourceUser(parent, id) {
          var _this = this;
          if (id == null) {
              throw new Error('Resource ID cannot be null!');
          }
          _this = _super.call(this, parent) || this;
          if (id === 'me') {
              _this.push('me');
          }
          else if (typeof id === 'number') {
              _this.push('users', id);
          }
          else {
              throw new TypeError('id is not a number');
          }
          return _this;
      }
      // /users/{id}/device-time
      APIResourceUser.prototype.deviceTime = function () {
          return new APIListDeviceTime(this);
      };
      // /users/{id}/services
      APIResourceUser.prototype.services = function () {
          return new APIListServices(this);
      };
      // /users/{id}/services/{id}
      APIResourceUser.prototype.service = function (id) {
          if (id == null) {
              throw new Error('Resource ID cannot be null!');
          }
          return new APIResource(this).push('services', id);
      };
      // /users/{id}/account-services/{id}/billing-period
      APIResourceUser.prototype.accountServiceBillingPeriod = function (id) {
          if (id == null) {
              throw new Error('Resource ID cannot be null!');
          }
          return new APIResource(this).push('account-services', id, 'billing-period');
      };
      // /users/{id}/billing-periods
      APIResourceUser.prototype.billingPeriods = function () {
          return new APIList(this).push('billing-periods');
      };
      // /users/{id}/billing-periods/{id}
      APIResourceUser.prototype.billingPeriod = function (id) {
          return new APIResourceBillingPeriod(this, id);
      };
      // /users/{id}/jobs
      APIResourceUser.prototype.jobs = function () {
          return new APIList(this).push('jobs');
      };
      // /users/{id}/jobs/{id}
      APIResourceUser.prototype.job = function (id) {
          return new APIResourceJob(this, id);
      };
      // /users/{id}/device-groups
      APIResourceUser.prototype.deviceGroups = function () {
          return new APIList(this).push('device-groups');
      };
      // /users/{id}/device-groups/{id}
      APIResourceUser.prototype.deviceGroup = function (id) {
          return new APIResourceDeviceGroup(this, id);
      };
      // /users/{id}/device-sessions
      APIResourceUser.prototype.deviceSessions = function () {
          return new APIList(this).push('device-sessions');
      };
      // /users/{id}/device-sessions/{id}
      APIResourceUser.prototype.deviceSession = function (id) {
          return new APIResourceDeviceSession(this, id);
      };
      // /users/{id}/device-sessions/{id} - for Manual Device Sessions only
      APIResourceUser.prototype.manualSession = function (id) {
          return new APIResourceManualSession(this, id);
      };
      // /users/{id}/projects
      APIResourceUser.prototype.projects = function () {
          return new APIList(this).push('projects');
      };
      // /users/{id}/projects/{id}
      APIResourceUser.prototype.project = function (id) {
          return new APIResourceProject(this, id);
      };
      // /users/{id}/files
      APIResourceUser.prototype.files = function () {
          return new APIListFiles(this);
      };
      // /users/{id}/files/{id}
      APIResourceUser.prototype.file = function (id) {
          return new APIResourceFile(this, id);
      };
      // /users/{id}/runs
      APIResourceUser.prototype.runs = function () {
          return new APIListRuns(this);
      };
      // /users/{id}/available-build-executors
      APIResourceUser.prototype.availableBuildExecutors = function () {
          return new APIList(this).push('available-build-executors');
      };
      // /users/{id}/available-frameworks
      APIResourceUser.prototype.availableFrameworks = function () {
          return new APIList(this).push('available-frameworks');
      };
      /**
       * /users/{id}/
       * /users/{id}/reset-api-key
       */
      APIResourceUser.prototype.resetApiKey = function () {
          return new APIResource(this).push('reset-api-key');
      };
      // /users/{id}/restore
      APIResourceUser.prototype.restore = function () {
          return new APIResource(this).push('restore');
      };
      // /users/{id}/account/additional-users
      APIResourceUser.prototype.accountAdditionalUsers = function () {
          return new APIList(this).push('account', 'additional-users');
      };
      // /users/{id}/account/additional-users/{id}
      APIResourceUser.prototype.accountAdditionalUser = function (id) {
          if (id == null) {
              throw new Error('Resource ID cannot be null!');
          }
          return new APIResource(this).push('account', 'additional-users', id);
      };
      // /users/{id}/feedback
      APIResourceUser.prototype.feedback = function () {
          return new APIResource(this).push('feedback');
      };
      // /users/{id}/notifications
      APIResourceUser.prototype.notifications = function () {
          return new APIListNotifications(this);
      };
      // /users/{id}/notifications/{id}
      APIResourceUser.prototype.notification = function (id) {
          return new APIResourceNotification(this, id);
      };
      // /users/{id}/receipts
      APIResourceUser.prototype.receipts = function () {
          return new APIList(this).push('receipts');
      };
      // /users/{id}/ui-preferences
      APIResourceUser.prototype.uiPreferences = function () {
          return new APIResource(this).push('ui-preferences');
      };
      // /users/{id}/integrations
      APIResourceUser.prototype.integrations = function () {
          return new APIList(this).push('integrations');
      };
      // /users/{id}/integrations/{id}
      APIResourceUser.prototype.integration = function (id) {
          if (id == null) {
              throw new Error('Resource ID cannot be null!');
          }
          return new APIResource(this).push('integrations', id);
      };
      // /users/{id}/device-usage
      APIResourceUser.prototype.deviceUsage = function () {
          return new APIList(this).push('device-usage');
      };
      // /users/{id}/statistics
      APIResourceUser.prototype.statistics = function () {
          return new APIList(this).push('statistics');
      };
      return APIResourceUser;
  }(APIResource));

  /**
   * APIResourceDevice
   *
   * @class
   * @extends APIResource
   */
  var APIResourceDevice = /** @class */ (function (_super) {
      __extends(APIResourceDevice, _super);
      /**
       * /devices/{id}
       *
       * Constructor
       */
      function APIResourceDevice(parent, id) {
          var _this = this;
          if (id == null) {
              throw new Error('Resource ID cannot be null!');
          }
          _this = _super.call(this, parent) || this;
          _this.push('devices', id);
          return _this;
      }
      // /devices/{id}/properties
      APIResourceDevice.prototype.properties = function () {
          return new APIList(this).push('properties');
      };
      return APIResourceDevice;
  }(APIResource));

  /**
   * APIResourceUserSession
   *
   * @class
   * @extends APIResource
   */
  var APIResourceUserSession = /** @class */ (function (_super) {
      __extends(APIResourceUserSession, _super);
      // Constructor
      // /user-sessions
      function APIResourceUserSession(parent) {
          var _this = _super.call(this, parent) || this;
          _this.push('user-sessions');
          return _this;
      }
      // /user-sessions/login
      APIResourceUserSession.prototype.login = function (data) {
          return new APIResource(this).push('login').post().data(data);
      };
      // /user-sessions/logout
      APIResourceUserSession.prototype.logout = function () {
          return new APIResource(this).push('logout').post();
      };
      // /user-sessions/{name}-login
      APIResourceUserSession.prototype.sso = function (name) {
          return new APIResource(this).push(name + '-login');
      };
      return APIResourceUserSession;
  }(APIResource));

  /**
   * APIAdminResource
   *
   * @class
   * @extends APIResource
   */
  var APIAdminResource = /** @class */ (function (_super) {
      __extends(APIAdminResource, _super);
      /**
       * /admin
       *
       * Constructor
       */
      function APIAdminResource(parent) {
          return _super.call(this, parent) || this;
      }
      // /device-status
      APIAdminResource.prototype.deviceStatuses = function () {
          return new APIList(this).push('device-status');
      };
      // /files
      APIAdminResource.prototype.files = function () {
          return new APIList(this).push('files');
      };
      // /files/{id}
      APIAdminResource.prototype.file = function (id) {
          return new APIResourceFile(this, id);
      };
      // /runs
      APIAdminResource.prototype.runs = function () {
          return new APIList(this).push('runs');
      };
      // /projects
      APIAdminResource.prototype.projects = function () {
          return new APIList(this).push('projects');
      };
      return APIAdminResource;
  }(APIResource));

  if (globalThis.isNodeJs) {
      // Set User-Agent
      axios.defaults.headers.common['User-Agent'] = "Bitbar Cloud API Client for JavaScript v" + version;
  }
  // Disable max content length
  axios.defaults.maxContentLength = 1073741824; // 1GB
  /**
   * API
   * Root for other API resources
   */
  var API = /** @class */ (function () {
      function API(config) {
          if (config == null) {
              throw new Error('config cannot be empty');
          }
          this.config = config;
          this.axiosConfig = {};
          if (this.config.cloudUrl == null) {
              throw new TypeError('cloudUrl cannot be empty');
          }
          else if (typeof this.config.cloudUrl !== 'string') {
              throw new TypeError('cloudUrl must be a string');
          }
          else if (!/^https?:\/\/.{2,}/.test(this.config.cloudUrl)) {
              throw new Error("cloudUrl doesn't look like a URL");
          }
          // Validate and correct cloudUrl if needed
          this.axiosConfig.baseURL = this.config.cloudUrl.replace(/\/+$/, '') + '/api';
          // Check v2
          this.config.v2 = !!this.config.v2;
          if (this.config.v2) {
              this.axiosConfig.baseURL += '/v2';
          }
          // Check if apiKey is set
          if (this.config.apiKey) {
              if (typeof this.config.apiKey !== 'string') {
                  throw new TypeError('apiKey must be a string');
              }
              else if (!/^[A-Za-z0-9]{32}$/.test(this.config.apiKey)) {
                  throw new Error("apiKey is in the wrong format");
              }
              this.axiosConfig.auth = {
                  username: this.config.apiKey,
                  password: ''
              };
          }
          // Create axios instance
          this.axios = axios.create(this.axiosConfig);
      }
      // --- Resources starts here --- //
      API.prototype.userSession = function () {
          return new APIResourceUserSession(this);
      };
      // /user/{id}
      API.prototype.user = function (id) {
          return new APIResourceUser(this, id);
      };
      // /users
      API.prototype.users = function () {
          return new APIListUsers(this);
      };
      // /me
      API.prototype.me = function () {
          return this.user('me');
      };
      // /admin
      API.prototype.admin = function () {
          return new APIAdminResource(this);
      };
      // /devices
      API.prototype.devices = function () {
          return new APIListDevices(this);
      };
      // /devices/{id}
      API.prototype.device = function (id) {
          return new APIResourceDevice(this, id);
      };
      // /device-groups
      API.prototype.deviceGroups = function () {
          return new APIList(this).push('device-groups');
      };
      // /device-groups/{id}
      API.prototype.deviceGroup = function (id) {
          return new APIResourceDeviceGroup(this, id);
      };
      // /label-groups
      API.prototype.labelGroups = function () {
          return new APIList(this).push('label-groups');
      };
      return API;
  }());

  /**
   * Cloud API Client
   */
  var CloudAPIClient = {
      API: API,
      FilterBuilder: FilterBuilder
  };

  return CloudAPIClient;

})));

/* Bitbar Cloud API Client for JavaScript v0.17.0 | (c) Bitbar Technologies and contributors | https://github.com/bitbar/cloud-api-client-js/blob/master/LICENSE.md */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('@bitbar/finka'), require('axios'), require('qs')) :
  typeof define === 'function' && define.amd ? define(['@bitbar/finka', 'axios', 'qs'], factory) :
  (global = global || self, global['cloud-api-client-js'] = factory(global['@bitbar/finka'], global.axios, global.qs));
}(this, (function (finka, axios, qs) { 'use strict';

  finka = finka && Object.prototype.hasOwnProperty.call(finka, 'default') ? finka['default'] : finka;
  axios = axios && Object.prototype.hasOwnProperty.call(axios, 'default') ? axios['default'] : axios;
  qs = qs && Object.prototype.hasOwnProperty.call(qs, 'default') ? qs['default'] : qs;

  finka();

  var version = "0.17.0";

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

  var ALLOWED_HTTP_METHODS;
  (function (ALLOWED_HTTP_METHODS) {
      ALLOWED_HTTP_METHODS["GET"] = "GET";
      ALLOWED_HTTP_METHODS["POST"] = "POST";
      ALLOWED_HTTP_METHODS["DELETE"] = "DELETE";
  })(ALLOWED_HTTP_METHODS || (ALLOWED_HTTP_METHODS = {}));
  var APIEntity = (function () {
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
      APIEntity.prototype.pop = function () {
          this.stack.pop();
          return this;
      };
      APIEntity.prototype.toUrl = function (absolute) {
          if (absolute === void 0) { absolute = false; }
          var url = "/" + this.stack.join('/');
          if (absolute) {
              url = this.root.axiosConfig.baseURL + url;
          }
          return url;
      };
      APIEntity.prototype.setRequestConfig = function (requestConfig) {
          Object.deepAssign(this.requestConfig, requestConfig);
          return this;
      };
      APIEntity.prototype.removeRequestConfig = function (key) {
          delete this.requestConfig[key];
          return this;
      };
      APIEntity.prototype.headers = function (headers) {
          var _headers = {};
          for (var key in headers) {
              var newKey = key.replace(/(?:^|-)([a-z])/g, function (letter) { return letter.toUpperCase(); });
              _headers[newKey] = headers[key];
          }
          return this.setRequestConfig({
              headers: _headers
          });
      };
      APIEntity.prototype.method = function (name) {
          var NAME = name.toLocaleUpperCase();
          if (!ALLOWED_HTTP_METHODS[NAME]) {
              throw new Error("Method '" + NAME + "' is not allowed! You can use: " + Object.keys(ALLOWED_HTTP_METHODS).join(', '));
          }
          return this.setRequestConfig({
              method: NAME
          });
      };
      APIEntity.prototype.get = function () {
          return this.method('GET');
      };
      APIEntity.prototype.post = function () {
          return this.method('POST');
      };
      APIEntity.prototype.params = function (params) {
          Object.deepAssign(this.requestConfig, {
              params: params
          });
          return this;
      };
      APIEntity.prototype.getParams = function () {
          return this.requestConfig.params == null ? {} : this.requestConfig.params;
      };
      APIEntity.prototype.removeParam = function (key) {
          delete this.requestConfig.params[key];
          return this;
      };
      APIEntity.prototype.data = function (data) {
          Object.deepAssign(this.requestConfig, {
              data: data
          });
          return this;
      };
      APIEntity.prototype.jsonData = function (data) {
          this.headers({
              'Content-Type': 'application/json'
          }).data(data);
          return this;
      };
      APIEntity.prototype.paramsSerializer = function (params) {
          return qs.stringify(params, {
              arrayFormat: 'brackets'
          });
      };
      APIEntity.prototype.send = function () {
          var requestConfig = Object.deepAssign({}, this.requestConfig, {
              url: "/" + this.stack.join('/')
          });
          if (requestConfig.headers == null) {
              requestConfig.headers = {};
          }
          if (requestConfig.headers['Content-Type'] == null) {
              requestConfig.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
          }
          if (requestConfig.method === 'POST' &&
              requestConfig.headers['Content-Type'].startsWith('application/x-www-form-urlencoded') &&
              requestConfig.data != null) {
              requestConfig.data = qs.stringify(requestConfig.data);
          }
          if (requestConfig.params) {
              requestConfig.paramsSerializer = this.paramsSerializer;
          }
          return this.root.axios.request(requestConfig);
      };
      return APIEntity;
  }());

  var Filter = (function () {
      function Filter(name, value, operand) {
          this.name = name;
          this.value = value;
          this.operand = operand;
      }
      return Filter;
  }());

  var FilterBuilder = (function () {
      function FilterBuilder() {
          this.filters = [];
      }
      FilterBuilder.prototype.add = function (name, value, operand, checkNull) {
          if (checkNull === void 0) { checkNull = false; }
          value = Array.wrap(value);
          if (value.length === 0) {
              return this;
          }
          for (var i = 0; i < value.length; i++) {
              var v = value[i];
              if (typeof v === 'object' && v instanceof Date) {
                  value[i] = v.getTime();
              }
          }
          if (checkNull) {
              for (var _i = 0, value_1 = value; _i < value_1.length; _i++) {
                  var v = value_1[_i];
                  if (v !== null) {
                      continue;
                  }
              }
          }
          if (operand.endsWith('ornull') && value.length === 0) {
              operand = 'isnull';
          }
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
      FilterBuilder.prototype.isFilterPart = function (str) {
          return /^[a-zA-Z0-9.]{2,12}_(?:isnull$|(?:gt|lt|(?:after|before)(?:orequal)?|on|eq|contains|like|(?:not)?in)_)/.test(str);
      };
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

  var DEFAULT_LIMIT = 20;
  var DEFAULT_OFFSET = 0;
  var APIOrder;
  (function (APIOrder) {
      APIOrder["asc"] = "a";
      APIOrder["desc"] = "d";
  })(APIOrder || (APIOrder = {}));
  var APIList = (function (_super) {
      __extends(APIList, _super);
      function APIList() {
          return _super !== null && _super.apply(this, arguments) || this;
      }
      APIList.prototype.create = function (data) {
          return this.post().data(data).send();
      };
      APIList.prototype.sort = function (name, order) {
          if (order === void 0) { order = APIOrder.asc; }
          return this.params({
              sort: name + "_" + order
          });
      };
      APIList.prototype.limit = function (limit) {
          if (limit === void 0) { limit = DEFAULT_LIMIT; }
          if (!Number.isNatural(limit)) {
              throw new Error("Limit '" + limit + "' is invalid!");
          }
          return this.params({
              limit: limit
          });
      };
      APIList.prototype.getLimit = function () {
          var params = this.getParams();
          return params.limit == null ? DEFAULT_LIMIT : params.limit;
      };
      APIList.prototype.noLimit = function () {
          return this.limit(0);
      };
      APIList.prototype.offset = function (offset) {
          if (offset === void 0) { offset = DEFAULT_OFFSET; }
          if (!Number.isNatural(offset)) {
              throw new Error("Offset '" + offset + "' is invalid!");
          }
          return this.params({
              offset: offset
          });
      };
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
      APIList.prototype.only = function (idx) {
          if (!Number.isNatural(idx)) {
              throw new Error("Index '" + idx + "' is invalid!");
          }
          return this.params({
              offset: idx,
              limit: 1
          });
      };
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
      APIList.prototype.search = function (query) {
          if (typeof query !== 'string') {
              throw new Error('Search query must be a string!');
          }
          return this.params({
              search: query
          });
      };
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

  var APIResource = (function (_super) {
      __extends(APIResource, _super);
      function APIResource() {
          return _super !== null && _super.apply(this, arguments) || this;
      }
      APIResource.prototype.delete = function () {
          this.method('DELETE');
      };
      return APIResource;
  }(APIEntity));

  var APIListDevices = (function (_super) {
      __extends(APIListDevices, _super);
      function APIListDevices(parent) {
          var _this = _super.call(this, parent) || this;
          _this.push('devices');
          return _this;
      }
      APIListDevices.prototype.filters = function () {
          return new APIResource(this).push('filters');
      };
      APIListDevices.prototype.cleanupConfigurations = function () {
          return new APIList(this).push('cleanup-configurations');
      };
      APIListDevices.prototype.cleanupConfiguration = function (id) {
          if (id == null) {
              throw new Error('Resource ID cannot be null!');
          }
          return new APIResource(this).push('cleanup-configurations', id);
      };
      return APIListDevices;
  }(APIList));

  var APIListUsers = (function (_super) {
      __extends(APIListUsers, _super);
      function APIListUsers(parent) {
          var _this = _super.call(this, parent) || this;
          _this.push('users');
          return _this;
      }
      APIListUsers.prototype.activate = function () {
          return new APIResource(this).push('activate');
      };
      APIListUsers.prototype.recoveries = function () {
          return new APIResource(this).push('recoveries');
      };
      APIListUsers.prototype.passwordRecovery = function () {
          return new APIResource(this).push('password-recovery');
      };
      APIListUsers.prototype.resetApiKey = function () {
          return new APIResource(this).push('reset-api-key');
      };
      APIListUsers.prototype.validateVatId = function () {
          return new APIResource(this).push('validateVatId');
      };
      return APIListUsers;
  }(APIList));

  var APIResourceAdditionalUser = (function (_super) {
      __extends(APIResourceAdditionalUser, _super);
      function APIResourceAdditionalUser(parent, id) {
          var _this = this;
          if (id == null) {
              throw new Error('Resource ID cannot be null!');
          }
          _this = _super.call(this, parent) || this;
          _this.push('additional-users', id);
          return _this;
      }
      APIResourceAdditionalUser.prototype.resendActivation = function () {
          return new APIResource(this).push('resend-activation');
      };
      return APIResourceAdditionalUser;
  }(APIResource));

  var APIResourceAccount = (function (_super) {
      __extends(APIResourceAccount, _super);
      function APIResourceAccount(parent) {
          var _this = _super.call(this, parent) || this;
          _this.push('account');
          return _this;
      }
      APIResourceAccount.prototype.roles = function () {
          return new APIList(this).push('roles');
      };
      APIResourceAccount.prototype.role = function (id) {
          if (id == null) {
              throw new Error('Resource ID cannot be null!');
          }
          return new APIResource(this).push('roles', id);
      };
      APIResourceAccount.prototype.additionalUsers = function () {
          return new APIList(this).push('additional-users');
      };
      APIResourceAccount.prototype.additionalUser = function (id) {
          return new APIResourceAdditionalUser(this, id);
      };
      return APIResourceAccount;
  }(APIResource));

  var APIResourceBillingPeriod = (function (_super) {
      __extends(APIResourceBillingPeriod, _super);
      function APIResourceBillingPeriod(parent, id) {
          var _this = this;
          if (id == null) {
              throw new Error('Resource ID cannot be null!');
          }
          _this = _super.call(this, parent) || this;
          _this.push('billing-periods', id);
          return _this;
      }
      APIResourceBillingPeriod.prototype.receipt = function () {
          return new APIResource(this).push('receipt').setRequestConfig({
              responseType: 'arraybuffer'
          });
      };
      return APIResourceBillingPeriod;
  }(APIResource));

  var APIResourceBuild = (function (_super) {
      __extends(APIResourceBuild, _super);
      function APIResourceBuild(parent, id) {
          var _this = this;
          if (id == null) {
              throw new Error('Resource ID cannot be null!');
          }
          _this = _super.call(this, parent) || this;
          _this.push('builds', id);
          return _this;
      }
      APIResourceBuild.prototype.abort = function () {
          return new APIResource(this).push('abort');
      };
      APIResourceBuild.prototype.outputFiles = function () {
          return new APIList(this).push('output-file-set', 'files');
      };
      return APIResourceBuild;
  }(APIResource));

  var APIResourceJob = (function (_super) {
      __extends(APIResourceJob, _super);
      function APIResourceJob(parent, id) {
          var _this = this;
          if (id == null) {
              throw new Error('Resource ID cannot be null!');
          }
          _this = _super.call(this, parent) || this;
          _this.push('jobs', id);
          return _this;
      }
      APIResourceJob.prototype.builds = function () {
          return new APIList(this).push('builds');
      };
      APIResourceJob.prototype.build = function (id) {
          return new APIResourceBuild(this, id);
      };
      return APIResourceJob;
  }(APIResource));

  var APIResourceDeviceGroup = (function (_super) {
      __extends(APIResourceDeviceGroup, _super);
      function APIResourceDeviceGroup(parent, id) {
          var _this = this;
          if (id == null) {
              throw new Error('Resource ID cannot be null!');
          }
          _this = _super.call(this, parent) || this;
          _this.push('device-groups', id);
          return _this;
      }
      APIResourceDeviceGroup.prototype.devices = function () {
          return new APIList(this).push('devices');
      };
      APIResourceDeviceGroup.prototype.device = function (id) {
          if (id == null) {
              throw new Error('Resource ID cannot be null!');
          }
          return new APIResource(this).push('devices', id);
      };
      APIResourceDeviceGroup.prototype.selectors = function () {
          return new APIList(this).push('selectors');
      };
      APIResourceDeviceGroup.prototype.selector = function (id) {
          if (id == null) {
              throw new Error('Resource ID cannot be null!');
          }
          return new APIResource(this).push('selectors', id);
      };
      return APIResourceDeviceGroup;
  }(APIResource));

  var InputFileset = (function (_super) {
      __extends(InputFileset, _super);
      function InputFileset(parent) {
          var _this = _super.call(this, parent) || this;
          _this.push('input-file-set');
          return _this;
      }
      InputFileset.prototype.files = function () {
          return new APIList(this).push('files');
      };
      InputFileset.prototype.filesZip = function () {
          return new APIResource(this).push('files.zip');
      };
      return InputFileset;
  }(APIResource));

  var NON_MEDIA_FILES_FILTER = new FilterBuilder();
  NON_MEDIA_FILES_FILTER.eq('state', 'READY');
  NON_MEDIA_FILES_FILTER.notin('mimetype', [
      'image/png', 'image/jpg', 'image/jpeg', 'image/webp', 'image/gif',
      'video/mp4', 'video/avi', 'video/webm', 'video/ogg', 'video/mpeg'
  ]);
  var OutputFileset = (function (_super) {
      __extends(OutputFileset, _super);
      function OutputFileset(parent) {
          var _this = _super.call(this, parent) || this;
          _this.push('output-file-set');
          return _this;
      }
      OutputFileset.prototype.files = function () {
          return new APIList(this).push('files');
      };
      OutputFileset.prototype.filesZip = function () {
          return new APIResource(this).push('files.zip');
      };
      OutputFileset.prototype.screenshots = function () {
          return new APIList(this).push('screenshots');
      };
      OutputFileset.prototype.screenshot = function (id) {
          if (id == null) {
              throw new Error('Resource ID cannot be null!');
          }
          return new APIResource(this).push('screenshots', id);
      };
      OutputFileset.prototype.screenshotFile = function (id) {
          this.screenshot(id).push('file');
      };
      OutputFileset.prototype.videos = function () {
          this.files().params({
              filter: 's_state_eq_READY',
              tag: ['video']
          });
      };
      OutputFileset.prototype.nonMediaFiles = function () {
          return this.files().filter(NON_MEDIA_FILES_FILTER);
      };
      return OutputFileset;
  }(APIResource));

  var APIResourceDeviceSession = (function (_super) {
      __extends(APIResourceDeviceSession, _super);
      function APIResourceDeviceSession(parent, id) {
          var _this = this;
          if (id == null) {
              throw new Error('Resource ID cannot be null!');
          }
          _this = _super.call(this, parent) || this;
          _this.push('device-sessions', id);
          return _this;
      }
      APIResourceDeviceSession.prototype.clusterLogs = function () {
          return new APIResource(this).push('cluster-logs');
      };
      APIResourceDeviceSession.prototype.dataAvailability = function () {
          return new APIResource(this).push('data-availability');
      };
      APIResourceDeviceSession.prototype.fixturesZip = function () {
          return new APIResource(this).push('fixtures.zip');
      };
      APIResourceDeviceSession.prototype.junitXml = function () {
          return new APIResource(this).push('junit.xml');
      };
      APIResourceDeviceSession.prototype.logs = function () {
          return new APIResource(this).push('logs');
      };
      APIResourceDeviceSession.prototype.performance = function () {
          return new APIResource(this).push('performance');
      };
      APIResourceDeviceSession.prototype.release = function () {
          return new APIResource(this).push('release');
      };
      APIResourceDeviceSession.prototype.resultDataZip = function () {
          return new APIResource(this).push('result-data.zip');
      };
      APIResourceDeviceSession.prototype.screenshots = function () {
          return new APIList(this).push('screenshots');
      };
      APIResourceDeviceSession.prototype.screenshot = function (id) {
          if (id == null) {
              throw new Error('Resource ID cannot be null!');
          }
          return new APIResource(this).push('screenshots', id);
      };
      APIResourceDeviceSession.prototype.steps = function () {
          return new APIList(this).push('steps');
      };
      APIResourceDeviceSession.prototype.step = function (id) {
          if (id == null) {
              throw new Error('Resource ID cannot be null!');
          }
          return new APIResource(this).push('steps', id);
      };
      APIResourceDeviceSession.prototype.currentStep = function () {
          return this.step('current');
      };
      APIResourceDeviceSession.prototype.testCaseRuns = function () {
          return new APIList(this).push('test-case-runs');
      };
      APIResourceDeviceSession.prototype.retry = function () {
          return new APIResource(this).push('retry').post();
      };
      APIResourceDeviceSession.prototype.input = function () {
          return new InputFileset(this);
      };
      APIResourceDeviceSession.prototype.output = function () {
          return new OutputFileset(this);
      };
      APIResourceDeviceSession.prototype.videos = function () {
          return this.output().videos();
      };
      return APIResourceDeviceSession;
  }(APIResource));

  var APIResourceManualSession = (function (_super) {
      __extends(APIResourceManualSession, _super);
      function APIResourceManualSession() {
          return _super !== null && _super.apply(this, arguments) || this;
      }
      APIResourceManualSession.prototype.connections = function () {
          return new APIResource(this).push('connections');
      };
      return APIResourceManualSession;
  }(APIResourceDeviceSession));

  var APIResourceRun = (function (_super) {
      __extends(APIResourceRun, _super);
      function APIResourceRun(parent, id) {
          var _this = this;
          if (id == null) {
              throw new Error('Resource ID cannot be null!');
          }
          _this = _super.call(this, parent) || this;
          _this.push('runs', id);
          return _this;
      }
      APIResourceRun.prototype.config = function () {
          return new APIResource(this).push('config');
      };
      APIResourceRun.prototype.deviceSessions = function () {
          return new APIList(this).push('device-sessions');
      };
      APIResourceRun.prototype.deviceSession = function (id) {
          return new APIResourceDeviceSession(this, id);
      };
      APIResourceRun.prototype.steps = function () {
          return new APIList(this).push('steps');
      };
      APIResourceRun.prototype.files = function () {
          return new APIList(this).push('files');
      };
      APIResourceRun.prototype.filesZip = function () {
          return new APIResource(this).push('files.zip');
      };
      APIResourceRun.prototype.tags = function () {
          return new APIList(this).push('tags');
      };
      APIResourceRun.prototype.tag = function (id) {
          if (id == null) {
              throw new Error('Resource ID cannot be null!');
          }
          return new APIResource(this).push('tags', id);
      };
      return APIResourceRun;
  }(APIResource));

  var APIResourceProject = (function (_super) {
      __extends(APIResourceProject, _super);
      function APIResourceProject(parent, id) {
          var _this = this;
          if (id == null) {
              throw new Error('Resource ID cannot be null!');
          }
          _this = _super.call(this, parent) || this;
          _this.push('projects', id);
          return _this;
      }
      APIResourceProject.prototype.runs = function () {
          return new APIList(this).push('runs');
      };
      APIResourceProject.prototype.run = function (id) {
          return new APIResourceRun(this, id);
      };
      APIResourceProject.prototype.runsExtended = function () {
          return new APIList(this).push('runs-extended');
      };
      APIResourceProject.prototype.runExtended = function (id) {
          if (id == null) {
              throw new Error('Resource ID cannot be null!');
          }
          return new APIResource(this).push('runs-extended', id);
      };
      APIResourceProject.prototype.files = function () {
          return new APIList(this).push('files');
      };
      APIResourceProject.prototype.filesZip = function () {
          return new APIResource(this).push('files.zip');
      };
      APIResourceProject.prototype.sharings = function () {
          return new APIList(this).push('sharings');
      };
      APIResourceProject.prototype.sharing = function (id) {
          if (id == null) {
              throw new Error('Resource ID cannot be null!');
          }
          return new APIResource(this).push('sharings', id);
      };
      return APIResourceProject;
  }(APIResource));

  var APIResourceFile = (function (_super) {
      __extends(APIResourceFile, _super);
      function APIResourceFile(parent, id) {
          var _this = this;
          if (id == null) {
              throw new Error('Resource ID cannot be null!');
          }
          _this = _super.call(this, parent) || this;
          _this.push('files', id);
          return _this;
      }
      APIResourceFile.prototype.file = function () {
          return new APIResource(this).push('file');
      };
      APIResourceFile.prototype.icon = function () {
          return new APIResource(this).push('icon');
      };
      APIResourceFile.prototype.tags = function () {
          return new APIList(this).push('tags');
      };
      return APIResourceFile;
  }(APIResource));

  var APIResourceNotification = (function (_super) {
      __extends(APIResourceNotification, _super);
      function APIResourceNotification(parent, id) {
          var _this = this;
          if (id == null) {
              throw new Error('Resource ID cannot be null!');
          }
          _this = _super.call(this, parent) || this;
          _this.push('notifications', id);
          return _this;
      }
      APIResourceNotification.prototype.test = function () {
          return new APIResource(this).push('test');
      };
      return APIResourceNotification;
  }(APIResource));

  var APIListDeviceTime = (function (_super) {
      __extends(APIListDeviceTime, _super);
      function APIListDeviceTime(parent) {
          var _this = _super.call(this, parent) || this;
          _this.push('device-time');
          return _this;
      }
      APIListDeviceTime.prototype.reserved = function () {
          return new APIList(this).push('reserved');
      };
      APIListDeviceTime.prototype.used = function () {
          return new APIList(this).push('used');
      };
      return APIListDeviceTime;
  }(APIList));

  var APIListFiles = (function (_super) {
      __extends(APIListFiles, _super);
      function APIListFiles(parent) {
          var _this = _super.call(this, parent) || this;
          _this.push('files');
          return _this;
      }
      APIListFiles.prototype.upload = function (obj) {
          var form;
          if (globalThis.isNodeJs) {
              var fs = require('fs');
              var FormData = require('form-data');
              form = new FormData();
              form.append('file', fs.createReadStream(obj.dir + '/' + obj.filename), {
                  filename: obj.filename
              });
          }
          else {
              throw new Error('Not supported yet!');
          }
          this.post().headers(form.getHeaders()).data(form);
      };
      return APIListFiles;
  }(APIList));

  var APIListPurchased = (function (_super) {
      __extends(APIListPurchased, _super);
      function APIListPurchased(parent) {
          var _this = _super.call(this, parent) || this;
          _this.push('purchased');
          return _this;
      }
      return APIListPurchased;
  }(APIList));

  var APIListServices = (function (_super) {
      __extends(APIListServices, _super);
      function APIListServices(parent) {
          var _this = _super.call(this, parent) || this;
          _this.push('services');
          return _this;
      }
      APIListServices.prototype.purchased = function () {
          return new APIListPurchased(this);
      };
      APIListServices.prototype.available = function () {
          this.push('available');
      };
      return APIListServices;
  }(APIList));

  var APIListRuns = (function (_super) {
      __extends(APIListRuns, _super);
      function APIListRuns(parent) {
          var _this = _super.call(this, parent) || this;
          _this.push('runs');
          return _this;
      }
      APIListRuns.prototype.config = function () {
          return new APIResource(this).push('config');
      };
      return APIListRuns;
  }(APIList));

  var APIListNotifications = (function (_super) {
      __extends(APIListNotifications, _super);
      function APIListNotifications(parent) {
          var _this = _super.call(this, parent) || this;
          _this.push('notifications');
          return _this;
      }
      APIListNotifications.prototype.scopes = function () {
          return new APIList(this).push('scopes');
      };
      APIListNotifications.prototype.channels = function () {
          return new APIList(this).push('channels');
      };
      return APIListNotifications;
  }(APIList));

  var APIResourceUser = (function (_super) {
      __extends(APIResourceUser, _super);
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
      APIResourceUser.prototype.account = function () {
          return new APIResourceAccount(this);
      };
      APIResourceUser.prototype.deviceTime = function () {
          return new APIListDeviceTime(this);
      };
      APIResourceUser.prototype.services = function () {
          return new APIListServices(this);
      };
      APIResourceUser.prototype.service = function (id) {
          if (id == null) {
              throw new Error('Resource ID cannot be null!');
          }
          return new APIResource(this).push('services', id);
      };
      APIResourceUser.prototype.accountServiceBillingPeriod = function (id) {
          if (id == null) {
              throw new Error('Resource ID cannot be null!');
          }
          return new APIResource(this).push('account-services', id, 'billing-period');
      };
      APIResourceUser.prototype.billingPeriods = function () {
          return new APIList(this).push('billing-periods');
      };
      APIResourceUser.prototype.billingPeriod = function (id) {
          return new APIResourceBillingPeriod(this, id);
      };
      APIResourceUser.prototype.jobs = function () {
          return new APIList(this).push('jobs');
      };
      APIResourceUser.prototype.job = function (id) {
          return new APIResourceJob(this, id);
      };
      APIResourceUser.prototype.deviceGroups = function () {
          return new APIList(this).push('device-groups');
      };
      APIResourceUser.prototype.deviceGroup = function (id) {
          return new APIResourceDeviceGroup(this, id);
      };
      APIResourceUser.prototype.deviceSessions = function () {
          return new APIList(this).push('device-sessions');
      };
      APIResourceUser.prototype.deviceSession = function (id) {
          return new APIResourceDeviceSession(this, id);
      };
      APIResourceUser.prototype.manualSession = function (id) {
          return new APIResourceManualSession(this, id);
      };
      APIResourceUser.prototype.projects = function () {
          return new APIList(this).push('projects');
      };
      APIResourceUser.prototype.project = function (id) {
          return new APIResourceProject(this, id);
      };
      APIResourceUser.prototype.files = function () {
          return new APIListFiles(this);
      };
      APIResourceUser.prototype.file = function (id) {
          return new APIResourceFile(this, id);
      };
      APIResourceUser.prototype.runs = function () {
          return new APIListRuns(this);
      };
      APIResourceUser.prototype.availableBuildExecutors = function () {
          return new APIList(this).push('available-build-executors');
      };
      APIResourceUser.prototype.availableFrameworks = function () {
          return new APIList(this).push('available-frameworks');
      };
      APIResourceUser.prototype.resetApiKey = function () {
          return new APIResource(this).push('reset-api-key');
      };
      APIResourceUser.prototype.restore = function () {
          return new APIResource(this).push('restore');
      };
      APIResourceUser.prototype.accountAdditionalUsers = function () {
          return new APIList(this).push('account', 'additional-users');
      };
      APIResourceUser.prototype.accountAdditionalUser = function (id) {
          if (id == null) {
              throw new Error('Resource ID cannot be null!');
          }
          return new APIResource(this).push('account', 'additional-users', id);
      };
      APIResourceUser.prototype.feedback = function () {
          return new APIResource(this).push('feedback');
      };
      APIResourceUser.prototype.notifications = function () {
          return new APIListNotifications(this);
      };
      APIResourceUser.prototype.notification = function (id) {
          return new APIResourceNotification(this, id);
      };
      APIResourceUser.prototype.receipts = function () {
          return new APIList(this).push('receipts');
      };
      APIResourceUser.prototype.preferences = function () {
          return new APIResource(this).push('preferences');
      };
      APIResourceUser.prototype.uiPreferences = function () {
          return new APIResource(this).push('ui-preferences');
      };
      APIResourceUser.prototype.integrations = function () {
          return new APIList(this).push('integrations');
      };
      APIResourceUser.prototype.integration = function (id) {
          if (id == null) {
              throw new Error('Resource ID cannot be null!');
          }
          return new APIResource(this).push('integrations', id);
      };
      APIResourceUser.prototype.deviceUsage = function () {
          return new APIList(this).push('device-usage');
      };
      APIResourceUser.prototype.statistics = function () {
          return new APIList(this).push('statistics');
      };
      return APIResourceUser;
  }(APIResource));

  var APIResourceDevice = (function (_super) {
      __extends(APIResourceDevice, _super);
      function APIResourceDevice(parent, id) {
          var _this = this;
          if (id == null) {
              throw new Error('Resource ID cannot be null!');
          }
          _this = _super.call(this, parent) || this;
          _this.push('devices', id);
          return _this;
      }
      APIResourceDevice.prototype.properties = function () {
          return new APIList(this).push('properties');
      };
      return APIResourceDevice;
  }(APIResource));

  var APIResourceUserSession = (function (_super) {
      __extends(APIResourceUserSession, _super);
      function APIResourceUserSession(parent) {
          var _this = _super.call(this, parent) || this;
          _this.push('user-sessions');
          return _this;
      }
      APIResourceUserSession.prototype.login = function (data) {
          return new APIResource(this).push('login').post().data(data);
      };
      APIResourceUserSession.prototype.logout = function () {
          return new APIResource(this).push('logout').post();
      };
      APIResourceUserSession.prototype.sso = function (name) {
          return new APIResource(this).push(name + '-login');
      };
      APIResourceUserSession.prototype.portalLogin = function () {
          return new APIResource(this).push('portal-login').post();
      };
      return APIResourceUserSession;
  }(APIResource));

  var APIAdminResourceCluster = (function (_super) {
      __extends(APIAdminResourceCluster, _super);
      function APIAdminResourceCluster(parent, id) {
          var _this = this;
          if (id == null) {
              throw new Error('Resource ID cannot be null!');
          }
          _this = _super.call(this, parent) || this;
          _this.push('clusters', id);
          return _this;
      }
      APIAdminResourceCluster.prototype.devices = function () {
          return new APIList(this).push('devices');
      };
      return APIAdminResourceCluster;
  }(APIResource));

  var APIAdminResourceDeviceTime = (function (_super) {
      __extends(APIAdminResourceDeviceTime, _super);
      function APIAdminResourceDeviceTime(parent) {
          var _this = _super.call(this, parent) || this;
          _this.push('device-time');
          return _this;
      }
      APIAdminResourceDeviceTime.prototype.countSessionReport = function () {
          return new APIList(this).push('count-session-report');
      };
      APIAdminResourceDeviceTime.prototype.stepTimeReport = function () {
          return new APIList(this).push('step-time-report');
      };
      return APIAdminResourceDeviceTime;
  }(APIResource));

  var APIAdminResourceRun = (function (_super) {
      __extends(APIAdminResourceRun, _super);
      function APIAdminResourceRun() {
          return _super !== null && _super.apply(this, arguments) || this;
      }
      APIAdminResourceRun.prototype.abort = function () {
          return new APIResource(this).push('abort').post();
      };
      APIAdminResourceRun.prototype.retry = function (ids) {
          var a = new APIResource(this).push('retry').setRequestConfig({
              timeout: 0
          }).post();
          if (ids != null) {
              a.params({
                  deviceRunIds: ids
              });
          }
          return a;
      };
      APIAdminResourceRun.prototype.changeBillable = function () {
          return new APIResource(this).push('changebillable');
      };
      APIAdminResourceRun.prototype.changePriority = function () {
          return new APIResource(this).push('changepriority');
      };
      APIAdminResourceRun.prototype.screenshotNames = function () {
          return new APIList(this).push('screenshot-names');
      };
      APIAdminResourceRun.prototype.screenshots = function () {
          return new APIList(this).push('screenshots');
      };
      APIAdminResourceRun.prototype.dataAvailability = function () {
          return new APIList(this).push('data-availability');
      };
      APIAdminResourceRun.prototype.buildLogsZip = function (ids) {
          var a = new APIResource(this).push('build-logs.zip');
          if (ids != null) {
              a.params({
                  deviceRunIds: ids
              });
          }
          return a;
      };
      APIAdminResourceRun.prototype.logsZip = function () {
          return new APIResource(this).push('logs.zip');
      };
      APIAdminResourceRun.prototype.performanceZip = function () {
          return new APIResource(this).push('performance.zip');
      };
      APIAdminResourceRun.prototype.screenshotsZip = function () {
          return new APIResource(this).push('screenshots.zip');
      };
      return APIAdminResourceRun;
  }(APIResourceRun));

  var APIAdminResourceDevice = (function (_super) {
      __extends(APIAdminResourceDevice, _super);
      function APIAdminResourceDevice(parent, id) {
          var _this = this;
          if (id == null) {
              throw new Error('Resource ID cannot be null!');
          }
          _this = _super.call(this, parent) || this;
          _this.push('admin');
          _this.push('devices', id);
          return _this;
      }
      APIAdminResourceDevice.prototype.queue = function () {
          return new APIList(this).push('queue');
      };
      return APIAdminResourceDevice;
  }(APIResource));

  var APIAdminResourceDeviceSession = (function (_super) {
      __extends(APIAdminResourceDeviceSession, _super);
      function APIAdminResourceDeviceSession(parent, id) {
          var _this = this;
          if (id == null) {
              throw new Error('Resource ID cannot be null!');
          }
          _this = _super.call(this, parent) || this;
          _this.push('device-sessions', id);
          return _this;
      }
      APIAdminResourceDeviceSession.prototype.changeBillable = function () {
          var a = new APIResource(this);
          a.stack.splice(a.stack.length - 2, 0, 'admin');
          return a.push('changebillable').post();
      };
      APIAdminResourceDeviceSession.prototype.connections = function () {
          return new APIList(this).push('connections');
      };
      APIAdminResourceDeviceSession.prototype.connection = function (id) {
          if (id == null) {
              throw new Error('Resource ID cannot be null!');
          }
          return new APIResource(this).push('connections', id);
      };
      APIAdminResourceDeviceSession.prototype.input = function () {
          return new InputFileset(this);
      };
      APIAdminResourceDeviceSession.prototype.output = function () {
          return new OutputFileset(this);
      };
      APIAdminResourceDeviceSession.prototype.release = function () {
          return new APIResource(this).push('release').post();
      };
      APIAdminResourceDeviceSession.prototype.screenshots = function () {
          return new APIList(this).push('screenshots');
      };
      APIAdminResourceDeviceSession.prototype.screenshot = function (id) {
          if (id == null) {
              throw new Error('Resource ID cannot be null!');
          }
          return new APIResource(this).push('screenshots', id);
      };
      APIAdminResourceDeviceSession.prototype.steps = function () {
          return new APIList(this).push('steps');
      };
      APIAdminResourceDeviceSession.prototype.step = function (id) {
          if (id == null) {
              throw new Error('Resource ID cannot be null!');
          }
          return new APIResource(this).push('steps', id);
      };
      APIAdminResourceDeviceSession.prototype.currentStep = function () {
          return this.step('current');
      };
      APIAdminResourceDeviceSession.prototype.testCaseRuns = function () {
          return new APIList(this).push('test-case-runs');
      };
      return APIAdminResourceDeviceSession;
  }(APIResource));

  var APIAdminResource = (function (_super) {
      __extends(APIAdminResource, _super);
      function APIAdminResource(parent) {
          return _super.call(this, parent) || this;
      }
      APIAdminResource.prototype.withAdmin = function () {
          return new APIResource(this).push('admin');
      };
      APIAdminResource.prototype.clusters = function () {
          return new APIList(this).push('clusters');
      };
      APIAdminResource.prototype.cluster = function (id) {
          return new APIAdminResourceCluster(this, id);
      };
      APIAdminResource.prototype.devices = function () {
          return new APIList(this).push('admin', 'devices');
      };
      APIAdminResource.prototype.device = function (id) {
          return new APIAdminResourceDevice(this, id);
      };
      APIAdminResource.prototype.deviceModels = function () {
          return new APIList(this).push('admin', 'device-models');
      };
      APIAdminResource.prototype.deviceModel = function (id) {
          return new APIResource(this).push('admin', 'device-models', id);
      };
      APIAdminResource.prototype.deviceSessions = function () {
          return new APIList(this).push('admin', 'device-sessions');
      };
      APIAdminResource.prototype.deviceSession = function (id) {
          return new APIAdminResourceDeviceSession(this, id);
      };
      APIAdminResource.prototype.deviceStatuses = function () {
          return new APIList(this).push('device-status');
      };
      APIAdminResource.prototype.deviceTime = function () {
          return new APIAdminResourceDeviceTime(this.withAdmin());
      };
      APIAdminResource.prototype.interactiveQueue = function () {
          return new APIList(this).push('admin', 'interactive-queue');
      };
      APIAdminResource.prototype.files = function () {
          return new APIList(this).push('files');
      };
      APIAdminResource.prototype.file = function (id) {
          return new APIResourceFile(this, id);
      };
      APIAdminResource.prototype.overview = function () {
          return new APIResource(this).push('admin', 'overview');
      };
      APIAdminResource.prototype.projects = function () {
          return new APIList(this).push('projects');
      };
      APIAdminResource.prototype.project = function (id) {
          return new APIResourceProject(this, id);
      };
      APIAdminResource.prototype.runs = function () {
          return new APIList(this).push('admin', 'runs');
      };
      APIAdminResource.prototype.run = function (id) {
          return new APIAdminResourceRun(this, id);
      };
      APIAdminResource.prototype.users = function () {
          return new APIList(this).push('users');
      };
      return APIAdminResource;
  }(APIResource));

  if (globalThis.isNodeJs) {
      axios.defaults.headers.common['User-Agent'] = "Bitbar Cloud API Client for JavaScript v" + version;
  }
  axios.defaults.maxContentLength = 1073741824;
  var API = (function () {
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
          this.axiosConfig.baseURL = this.config.cloudUrl.replace(/\/+$/, '') + '/api';
          this.config.v2 = !!this.config.v2;
          if (this.config.v2) {
              this.axiosConfig.baseURL += '/v2';
          }
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
          this.axios = axios.create(this.axiosConfig);
      }
      API.prototype.userSession = function () {
          return new APIResourceUserSession(this);
      };
      API.prototype.user = function (id) {
          return new APIResourceUser(this, id);
      };
      API.prototype.users = function () {
          return new APIListUsers(this);
      };
      API.prototype.me = function () {
          return this.user('me');
      };
      API.prototype.admin = function () {
          return new APIAdminResource(this);
      };
      API.prototype.devices = function () {
          return new APIListDevices(this);
      };
      API.prototype.device = function (id) {
          return new APIResourceDevice(this, id);
      };
      API.prototype.deviceGroups = function () {
          return new APIList(this).push('device-groups');
      };
      API.prototype.deviceGroup = function (id) {
          return new APIResourceDeviceGroup(this, id);
      };
      API.prototype.labelGroups = function () {
          return new APIList(this).push('label-groups');
      };
      return API;
  }());

  var CloudAPIClient = {
      API: API,
      FilterBuilder: FilterBuilder
  };

  return CloudAPIClient;

})));

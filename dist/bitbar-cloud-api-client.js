/* @bitbar/cloud-api-client v1.5.15 | Copyright 2025 (c) SmartBear Software and contributors | .git/blob/master/LICENSE */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@bitbar/finka'), require('qs'), require('node-abort-controller')) :
  typeof define === 'function' && define.amd ? define(['exports', '@bitbar/finka', 'qs', 'node-abort-controller'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global["bitbar-cloud-api-client"] = {}, global["@bitbar/finka"], global.qs, global["node-abort-controller"]));
})(this, (function (exports, finka, qs, nodeAbortController) { 'use strict';

  var version = "1.5.15";

  /******************************************************************************
  Copyright (c) Microsoft Corporation.

  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.

  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** */
  /* global Reflect, Promise, SuppressedError, Symbol, Iterator */


  function __decorate(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
  }

  typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
      var e = new Error(message);
      return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
  };

  class Filter {
      constructor(name, value, operand) {
          this.name = name;
          this.value = value;
          this.operand = operand;
      }
  }

  finka();

  class FilterBuilder {
      constructor() {
          this.filters = [];
      }
      gt(name, value) {
          return this.add(name, value, 'gt');
      }
      lt(name, value) {
          return this.add(name, value, 'lt');
      }
      after(name, value) {
          return this.add(name, value, 'after', true);
      }
      afterorequal(name, value) {
          return this.add(name, value, 'afterorequal', true);
      }
      before(name, value) {
          return this.add(name, value, 'before', true);
      }
      beforeorequal(name, value) {
          return this.add(name, value, 'beforeorequal', true);
      }
      on(name, value) {
          return this.add(name, value, 'on');
      }
      eq(name, value) {
          return this.add(name, value, 'eq');
      }
      contains(name, value) {
          return this.add(name, value, 'contains');
      }
      like(name, value) {
          return this.add(name, value, 'like');
      }
      notlike(name, value) {
          return this.add(name, value, 'notlike');
      }
      isnull(name) {
          return this.add(name, undefined, 'isnull');
      }
      isnotnull(name) {
          return this.add(name, undefined, 'isnotnull');
      }
      in(name, value) {
          return this.add(name, value, 'in', true);
      }
      notin(name, value) {
          return this.add(name, value, 'notin', true);
      }
      raw(filter) {
          const filters = Array.wrap(filter);
          for (const filter of filters) {
              if (this.isFilterPart(filter)) {
                  this.filters.push(filter);
              }
              else {
                  throw new SyntaxError(`Filter ${filter} has invalid syntax`);
              }
          }
      }
      isFilterPart(str) {
          return /^[a-zA-Z0-9.]{2,12}_(?:isnull$|(?:gt|lt|(?:after|before)(?:orequal)?|on|eq|contains|like|(?:not)?in)_)/.test(str);
      }
      toString() {
          const parts = [];
          let part, val;
          for (const filter of this.filters) {
              if (typeof filter === 'string') {
                  part = filter;
              }
              else {
                  val = '';
                  if (filter.value.length > 1 || typeof filter.value[0] !== 'undefined') {
                      val = `_${filter.value.join('|')}`;
                  }
                  part = `${filter.name}_${filter.operand}${val}`;
              }
              parts.push(part);
          }
          return parts.join(';');
      }
      add(name, value, operand, checkNull = false) {
          let _value = Array.wrap(value);
          if (_value.length === 0) {
              return this;
          }
          for (let i = 0; i < _value.length; i++) {
              const v = _value[i];
              if (typeof v === 'object' && v instanceof Date) {
                  _value[i] = v.getTime();
              }
          }
          let isNull = false;
          if (checkNull) {
              for (const v of _value) {
                  if (v !== null) {
                      continue;
                  }
                  isNull = true;
              }
              if (isNull) {
                  _value = _value.filter((item) => item !== null);
                  operand += 'ornull';
              }
          }
          if (operand.endsWith('ornull') && _value.length === 0) {
              operand = 'isnull';
          }
          this.filters.push(new Filter(name, _value, operand));
          return this;
      }
  }

  const ALLOWED_HTTP_METHODS = ['GET', 'POST', 'DELETE'];
  exports.APIOrder = void 0;
  (function (APIOrder) {
      APIOrder["asc"] = "a";
      APIOrder["desc"] = "d";
  })(exports.APIOrder || (exports.APIOrder = {}));

  class APIEntity {
      constructor(parent) {
          this.stack = [];
          this.requestConfig = {};
          this.ALLOWED_HTTP_METHODS = ALLOWED_HTTP_METHODS;
          if (parent instanceof APIEntity) {
              this.root = parent.root;
              if (Array.isArray(parent.stack)) {
                  this.push(...parent.stack);
              }
              if (parent.requestConfig != null) {
                  this.setRequestConfig(parent.requestConfig);
              }
          }
          else {
              this.root = parent;
          }
          this.abortController = new nodeAbortController.AbortController();
      }
      abortRequest() {
          this.abortController.abort();
          this.abortController = new nodeAbortController.AbortController();
      }
      push(...items) {
          this.stack = this.stack.concat(items);
          return this;
      }
      shift() {
          this.stack.shift();
          return this;
      }
      restack(...items) {
          this.stack = items;
          return this;
      }
      get first() {
          return this.stack[0];
      }
      get last() {
          return this.stack[this.stack.length - 1];
      }
      set last(val) {
          this.stack[this.stack.length - 1] = val;
      }
      toUrl(absolute = false) {
          let url = `/${this.stack.join('/')}`;
          if (absolute) {
              url = this.root.baseUrl + url;
          }
          return url;
      }
      setRequestConfig(requestConfig) {
          Object.deepAssign(this.requestConfig, requestConfig);
          return this;
      }
      removeRequestConfig(key) {
          delete this.requestConfig[key];
          return this;
      }
      headers(headers) {
          const _headers = {};
          for (const key in headers) {
              const newKey = key.replace(/(?:^|-)([a-z])/g, (letter) => letter.toUpperCase());
              _headers[newKey] = headers[key];
          }
          return this.setRequestConfig({
              headers: _headers
          });
      }
      method(name) {
          const NAME = name.toLocaleUpperCase();
          const isAllowed = this.ALLOWED_HTTP_METHODS.indexOf(NAME) > -1;
          if (!isAllowed) {
              throw new Error(`Method '${NAME}' is not allowed! You can use: ${this.ALLOWED_HTTP_METHODS.join(', ')}`);
          }
          return this.setRequestConfig({
              method: NAME
          });
      }
      get() {
          return this.method('GET');
      }
      post() {
          return this.method('POST');
      }
      delete() {
          return this.method('DELETE');
      }
      params(params) {
          this.setRequestConfig({ params });
          return this;
      }
      getParams() {
          return this.requestConfig.params == null ? {} : this.requestConfig.params;
      }
      removeParam(key) {
          delete this.requestConfig.params[key];
          return this;
      }
      data(data) {
          this.setRequestConfig({ data });
          return this;
      }
      jsonData(data) {
          this.headers({
              'Content-Type': 'application/json'
          }).data(data);
          return this;
      }
      formData(data) {
          this.headers({
              'Content-Type': 'multipart/form-data'
          }).data(data);
          return this;
      }
      send() {
          const requestConfig = Object.deepAssign({}, this.requestConfig, {
              url: `/${this.stack.join('/')}`,
              signal: this.abortController.signal
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
              requestConfig.data = this.paramsSerializer(requestConfig.data);
          }
          if (requestConfig.params) {
              requestConfig.paramsSerializer = this.paramsSerializer;
          }
          return this.root.axios.request(requestConfig);
      }
      paramsSerializer(params) {
          return qs.stringify(params, {
              arrayFormat: 'brackets'
          });
      }
  }

  const DEFAULT_LIMIT = 20;
  const DEFAULT_OFFSET = 0;
  class APIList extends APIEntity {
      constructor() {
          super(...arguments);
          this.all = this.noLimit;
          this.cut = this.between;
      }
      create(data) {
          return this.post().data(data).send();
      }
      sort(name, order = exports.APIOrder.asc) {
          return this.params({
              sort: `${name}_${order}`
          });
      }
      limit(limit = DEFAULT_LIMIT) {
          if (!Number.isNatural(limit)) {
              throw new Error(`Limit '${limit}' is invalid!`);
          }
          return this.params({
              limit
          });
      }
      getLimit() {
          const params = this.getParams();
          return params.limit == null ? DEFAULT_LIMIT : params.limit;
      }
      noLimit() {
          return this.limit(0);
      }
      offset(offset = DEFAULT_OFFSET) {
          if (!Number.isNatural(offset)) {
              throw new Error(`Offset '${offset}' is invalid!`);
          }
          return this.params({
              offset
          });
      }
      between(from, to) {
          if (!Number.isNatural(from)) {
              throw new Error(`From '${from}' is invalid!`);
          }
          if (!Number.isNatural(to)) {
              throw new Error(`To '${to}' is invalid!`);
          }
          return this.params({
              offset: from,
              limit: 1 + (to - from)
          });
      }
      only(idx) {
          if (!Number.isNatural(idx)) {
              throw new Error(`Index '${idx}' is invalid!`);
          }
          return this.params({
              offset: idx,
              limit: 1
          });
      }
      page(page = 1) {
          if (!Number.isNatural(page) || page == 0) {
              throw new Error(`Page '${page}' is invalid!`);
          }
          const limit = this.getLimit();
          const offset = (page - 1) * limit;
          return this.params({
              offset,
              limit
          });
      }
      search(query) {
          if (typeof query !== 'string') {
              throw new Error('Search query must be a string!');
          }
          return this.params({
              search: query
          });
      }
      filter(filter) {
          const isFilterBuilder = filter instanceof FilterBuilder;
          if (typeof filter !== 'string' && !isFilterBuilder) {
              throw new Error('Filter must be either string or instance of FilterBuilder');
          }
          return this.params({
              filter: filter.toString()
          });
      }
  }

  class APIResource extends APIEntity {
  }

  class APIListCleanupConfigurations extends APIList {
      constructor(parent) {
          super(parent);
          this.push('cleanup-configurations');
      }
      specific() {
          return new APIResource(this)
              .push('specific');
      }
  }

  class APIResourceCleanupConfiguration extends APIResource {
      constructor(parent, id) {
          if (id == null) {
              throw new Error('Resource ID cannot be null!');
          }
          super(parent);
          this.push('cleanup-configurations', id);
      }
      devices() {
          return new APIList(this).push('devices');
      }
  }

  class APIAdminListDevices extends APIList {
      constructor(parent) {
          super(parent);
          this.push('admin', 'devices');
      }
      cleanupConfigurations() {
          return new APIListCleanupConfigurations(this);
      }
      cleanupConfiguration(id) {
          return new APIResourceCleanupConfiguration(this, id);
      }
  }

  class APIAdminListRuns extends APIList {
      constructor(parent) {
          super(parent);
          this.ALLOWED_HTTP_METHODS = ['GET'];
          this.push('admin', 'runs');
      }
      config() {
          const apiResource = new APIResource(this);
          apiResource.restack('runs', 'config');
          return apiResource;
      }
  }

  class APIAdminListServices extends APIList {
      constructor(parent) {
          super(parent);
          this.push('admin', 'services');
      }
      active() {
          const apiList = new APIList(this);
          apiList.params({
              notArchived: true
          });
          return apiList;
      }
      activated() {
          const apiList = this.active();
          apiList.params({
              filter: 'activated_eq_true',
              limit: 0,
              sort: 'name_a'
          });
          return apiList;
      }
      inUse() {
          const apiList = new APIList(this);
          apiList.params({
              inUse: true,
              limit: 0,
              sort: 'name_a'
          });
          return apiList;
      }
      byPrice() {
          const apiList = new APIList(this);
          apiList.params({
              sort: 'centPrice_a'
          });
          return apiList;
      }
  }

  function NonRequestable(constructor) {
      return class extends constructor {
          send() {
              return Promise.reject();
          }
      };
  }

  let APIAdminListStatistics = class APIAdminListStatistics extends APIList {
      constructor(parent) {
          super(parent);
          this.push('admin', 'statistics');
      }
      frameworks() {
          return new APIList(this).push('frameworks');
      }
  };
  APIAdminListStatistics = __decorate([
      NonRequestable
  ], APIAdminListStatistics);

  class APIAdminResourceAccount extends APIResource {
      constructor(parent, id) {
          if (id == null) {
              throw new Error('Resource ID cannot be null!');
          }
          super(parent);
          this.push('admin', 'accounts', id);
      }
      roles() {
          return new APIList(this).push('roles');
      }
      role(id) {
          return new APIResource(this).push('roles', id);
      }
      accountServices() {
          return new APIList(this).push('account-services');
      }
      preferences() {
          return new APIResource(this).push('preferences');
      }
      usage() {
          return new APIList(this).push('usage');
      }
      usageSummary() {
          return new APIResource(this).push('usage-summary');
      }
  }

  class APIAdminResourceAccountService extends APIResource {
      constructor(parent, id) {
          if (id == null) {
              throw new Error('Resource ID cannot be null!');
          }
          super(parent);
          this.push('admin', 'account-services', id);
      }
      activate() {
          return new APIResource(this).push('activate').post();
      }
      deactivate() {
          return new APIResource(this).push('deactivate').post();
      }
  }

  class APIAdminResourceCluster extends APIResource {
      constructor(parent, id) {
          if (id == null) {
              throw new Error('Resource ID cannot be null!');
          }
          super(parent);
          this.push('clusters', id);
      }
      devices() {
          return new APIList(this).push('devices');
      }
  }

  class APIAdminResourceDevice extends APIResource {
      constructor(parent, id) {
          if (id == null) {
              throw new Error('Resource ID cannot be null!');
          }
          super(parent);
          this.push('admin', 'devices', id);
      }
      cleanupConfiguration() {
          return new APIResource(this).push('cleanup-configuration');
      }
      labels() {
          return new APIList(this).push('labels');
      }
      label(id) {
          return new APIResource(this).push('labels', id);
      }
      queue() {
          return new APIList(this).push('queue');
      }
  }

  class APIAdminResourceDeviceModel extends APIResource {
      constructor(parent, id) {
          if (id == null) {
              throw new Error('Resource ID cannot be null!');
          }
          super(parent);
          this.push('admin', 'device-models', id);
      }
      browsers() {
          return new APIList(this).push('browsers');
      }
  }

  exports.InputFileset = class InputFileset extends APIResource {
      constructor(parent) {
          super(parent);
          this.push('input-file-set');
      }
      files() {
          return new APIList(this).push('files');
      }
      filesZip() {
          return new APIResource(this).push('files.zip');
      }
  };
  exports.InputFileset = __decorate([
      NonRequestable
  ], exports.InputFileset);

  const IMAGE_FILES_FILTER = new FilterBuilder();
  IMAGE_FILES_FILTER.eq('state', 'READY');
  IMAGE_FILES_FILTER.in('mimetype', [
      'image/png', 'image/jpg', 'image/jpeg', 'image/webp', 'image/gif'
  ]);
  IMAGE_FILES_FILTER.notlike('name', 'action-%%');

  const NON_MEDIA_FILES_FILTER = new FilterBuilder();
  NON_MEDIA_FILES_FILTER.eq('state', 'READY');
  NON_MEDIA_FILES_FILTER.notin('mimetype', [
      'image/png', 'image/jpg', 'image/jpeg', 'image/webp', 'image/gif',
      'video/mp4', 'video/avi', 'video/webm', 'video/ogg', 'video/mpeg'
  ]);

  class APIListOutputFiles extends APIList {
      constructor(parent) {
          super(parent);
          this.push('files');
      }
      performance() {
          return this.params({
              tag: ['performance']
          });
      }
      images() {
          return this.filter(IMAGE_FILES_FILTER);
      }
      nonMediaFiles() {
          return this.filter(NON_MEDIA_FILES_FILTER);
      }
      videos() {
          return this.params({
              filter: 's_state_eq_READY',
              tag: ['video']
          });
      }
  }

  exports.OutputFileset = class OutputFileset extends APIResource {
      constructor(parent) {
          super(parent);
          this.push('output-file-set');
      }
      files() {
          return new APIListOutputFiles(this);
      }
      file(id) {
          return new APIResource(this).push('files', id);
      }
      filesZip() {
          return new APIResource(this).push('files.zip');
      }
      screenshots() {
          return new APIList(this).push('screenshots');
      }
      screenshot(id) {
          return new APIResource(this).push('screenshots', id);
      }
      screenshotFile(id) {
          return this.screenshot(id).push('file');
      }
  };
  exports.OutputFileset = __decorate([
      NonRequestable
  ], exports.OutputFileset);

  class APIListScreenshots extends APIList {
      constructor(parent) {
          super(parent);
          this.push('screenshots');
      }
  }

  class APIResourceDeviceSessionCommon extends APIResource {
      constructor(parent, id) {
          if (id == null) {
              throw new Error('Resource ID cannot be null!');
          }
          super(parent);
          this.push('device-sessions', id);
      }
      commands() {
          return new APIList(this).push('commands');
      }
      input() {
          return new exports.InputFileset(this);
      }
      output() {
          return new exports.OutputFileset(this);
      }
      release() {
          return new APIResource(this).push('release').post();
      }
      screenshots() {
          return new APIListScreenshots(this);
      }
      screenshot(id) {
          if (id == null) {
              throw new Error('Resource ID cannot be null!');
          }
          return new APIResource(this).push('screenshots', id);
      }
      steps() {
          return new APIList(this).push('steps');
      }
      step(id) {
          if (id == null) {
              throw new Error('Resource ID cannot be null!');
          }
          return new APIResource(this).push('steps', id);
      }
      currentStep() {
          return this.step('current');
      }
      connections() {
          return new APIList(this).push('connections');
      }
      logs() {
          return new APIResource(this).push('logs').setRequestConfig({
              responseType: 'text'
          });
      }
      clusterLogs() {
          return new APIResource(this).push('cluster-logs').setRequestConfig({
              responseType: 'text'
          });
      }
  }

  function postAdminDeviceSessionChangeBillable(parent, billable) {
      const apiResource = new APIResource(parent);
      const deviceSessionId = apiResource.last;
      return apiResource.restack('admin', 'device-sessions', deviceSessionId, 'changebillable').params({
          billable
      }).post();
  }

  class APIAdminResourceDeviceSessionStandalone extends APIResourceDeviceSessionCommon {
      changeBillable(billable) {
          return postAdminDeviceSessionChangeBillable(this, billable);
      }
  }

  class APIAdminResourceDeviceTime extends APIList {
      constructor(parent) {
          super(parent);
          this.push('admin', 'device-time');
      }
  }

  class APIAdminResourceFramework extends APIResource {
      constructor(parent, id) {
          if (id == null) {
              throw new Error('Resource ID cannot be null!');
          }
          super(parent);
          this.push('admin', 'frameworks', id);
      }
      config() {
          return new APIResource(this).push('config');
      }
      requiredRoles() {
          return new APIList(this).push('required-roles');
      }
  }

  class APIAdminResourceLicense extends APIResource {
      constructor(parent, id) {
          if (id == null) {
              throw new Error('Resource ID cannot be null!');
          }
          super(parent);
          this.push('admin', 'licenses', id);
      }
      activate() {
          return new APIResource(this).push('activate');
      }
      deactivate() {
          return new APIResource(this).push('deactivate');
      }
      resend() {
          return new APIResource(this).push('resend');
      }
      download() {
          return new APIResource(this).push('download');
      }
  }

  function postDeviceRunIds(parent, name, ids) {
      const a = new APIResource(parent).push(name);
      if (ids != null) {
          a.params({
              deviceRunIds: ids
          });
      }
      return a.post();
  }

  class APIAdminResourceRunStandalone extends APIResource {
      constructor(parent, id) {
          if (id == null) {
              throw new Error('Resource ID cannot be null!');
          }
          super(parent);
          this.push('admin', 'runs', id);
      }
      abort() {
          return new APIResource(this).push('abort').post();
      }
      changeBillable(billable) {
          return new APIResource(this).push('changebillable').post().params({
              billable
          });
      }
      changePriority(priority) {
          const resource = new APIResource(this).push('changepriority');
          if (priority) {
              resource.post().data({
                  priority
              });
          }
          return resource;
      }
      retry(ids) {
          return postDeviceRunIds(this, 'retry', ids).setRequestConfig({
              timeout: 0
          });
      }
  }

  class APIAdminResourceService extends APIResource {
      constructor(parent, id) {
          if (id == null) {
              throw new Error('Resource ID cannot be null!');
          }
          super(parent);
          this.push('admin', 'services', id);
      }
      activate() {
          return new APIResource(this).push('activate').post();
      }
  }

  let APIAdminResourceUserAccount = class APIAdminResourceUserAccount extends APIResource {
      constructor(parent) {
          super(parent);
          this.push('account');
      }
      roles() {
          return new APIList(this).push('roles');
      }
      role(id) {
          if (id == null) {
              throw new Error('Resource ID cannot be null!');
          }
          return new APIResource(this).push('roles', id);
      }
      services() {
          const a = new APIList(this);
          a.last += '-services';
          return a;
      }
      update() {
          const a = new APIResource(this);
          a.last = 'update-account';
          return a.post();
      }
  };
  APIAdminResourceUserAccount = __decorate([
      NonRequestable
  ], APIAdminResourceUserAccount);

  class APIResourceDeviceSessionStandalone extends APIResource {
      constructor(parent, id) {
          if (id == null) {
              throw new Error('Resource ID cannot be null!');
          }
          super(parent);
          this.push('device-sessions', id);
      }
      connections() {
          return new APIList(this).push('connections');
      }
      connection(id) {
          if (id == null) {
              throw new Error('Resource ID cannot be null!');
          }
          return new APIResource(this).push('connections', id);
      }
      input() {
          return new exports.InputFileset(this);
      }
      output() {
          return new exports.OutputFileset(this);
      }
      release() {
          return new APIResource(this).push('release').post();
      }
      visualTestsImages() {
          return new APIList(this).push('visual-tests', 'images');
      }
  }

  let APIAdminResourceUser = class APIAdminResourceUser extends APIResource {
      constructor(parent, id) {
          if (id == null) {
              throw new Error('Resource ID cannot be null!');
          }
          super(parent);
          this.push('admin', 'users', id);
      }
      disable() {
          return new APIResource(this).push('disable');
      }
      enable() {
          return new APIResource(this).push('enable');
      }
      licenses() {
          return new APIList(this).push('licenses');
      }
      resendActivation() {
          return new APIResource(this).push('resend-activation').post();
      }
      account() {
          return new APIAdminResourceUserAccount(this);
      }
      deviceSession(id) {
          return new APIResourceDeviceSessionStandalone(this, id);
      }
      roles() {
          return new APIList(this).push('roles');
      }
      role(id) {
          return new APIResource(this).push('roles', id);
      }
  };
  APIAdminResourceUser = __decorate([
      NonRequestable
  ], APIAdminResourceUser);

  class APIResourceAccessGroup extends APIResource {
      constructor(parent, id) {
          if (id == null) {
              throw new Error('Resource ID cannot be null!');
          }
          super(parent);
          this.push('access-groups', id);
      }
      users() {
          return new APIList(this).push('users');
      }
      user(id) {
          if (id == null) {
              throw new Error('Resource ID cannot be null!');
          }
          return new APIResource(this).push('users', id);
      }
      resources() {
          return new APIList(this).push('resources');
      }
      resource(id) {
          if (id == null) {
              throw new Error('Resource ID cannot be null!');
          }
          return new APIResource(this).push('resources', id);
      }
  }

  class APIResourceDeviceGroup extends APIResource {
      constructor(parent, id) {
          if (id == null) {
              throw new Error('Resource ID cannot be null!');
          }
          super(parent);
          this.push('device-groups', id);
      }
      devices() {
          return new APIList(this).push('devices');
      }
      device(id) {
          if (id == null) {
              throw new Error('Resource ID cannot be null!');
          }
          return new APIResource(this).push('devices', id);
      }
      selectors() {
          return new APIList(this).push('selectors');
      }
      selector(id) {
          if (id == null) {
              throw new Error('Resource ID cannot be null!');
          }
          return new APIResource(this).push('selectors', id);
      }
      share() {
          return new APIList(this).push('share');
      }
  }

  class APIResourceFile extends APIResource {
      constructor(parent, id) {
          if (id == null) {
              throw new Error('Resource ID cannot be null!');
          }
          super(parent);
          this.push('files', id);
      }
      file() {
          return new APIResource(this).push('file');
      }
      icon() {
          return new APIResource(this).push('icon');
      }
      tags() {
          return new APIList(this).push('tags');
      }
      share() {
          return new APIList(this).push('share');
      }
      property(id) {
          if (id == null) {
              throw new Error('Resource ID cannot be null!');
          }
          return new APIResource(this).push('properties', id);
      }
  }

  class APIListTestCaseRuns extends APIList {
      constructor(parent) {
          super(parent);
          this.push('test-case-runs');
      }
  }

  class APIResourceDeviceSession extends APIResourceDeviceSessionCommon {
      abort() {
          return new APIResource(this).push('abort').post();
      }
      retry() {
          return new APIResource(this).push('retry').post();
      }
      testCaseRuns() {
          return new APIListTestCaseRuns(this);
      }
  }

  class APIListTestRunDeviceSessions extends APIList {
      constructor(parent) {
          super(parent);
          this.push('device-sessions');
      }
  }

  class APIResourceRunCommon extends APIResource {
      constructor(parent, id) {
          if (id == null) {
              throw new Error('Resource ID cannot be null!');
          }
          super(parent);
          this.push('runs', id);
      }
      abort() {
          return new APIResource(this).push('abort').post();
      }
      buildLogsZip(ids) {
          return postDeviceRunIds(this, 'build-logs.zip', ids);
      }
      dataAvailability() {
          return new APIResource(this).push('data-availability');
      }
      deviceSessions() {
          return new APIListTestRunDeviceSessions(this);
      }
      filesZip(ids) {
          return postDeviceRunIds(this, 'files.zip', ids);
      }
      logsZip(ids) {
          return postDeviceRunIds(this, 'logs.zip', ids);
      }
      performanceZip(ids) {
          return postDeviceRunIds(this, 'performance.zip', ids);
      }
      retry(ids) {
          return postDeviceRunIds(this, 'retry', ids).setRequestConfig({
              timeout: 0
          });
      }
      screenshotsZip(ids) {
          return postDeviceRunIds(this, 'screenshots.zip', ids);
      }
      steps() {
          return new APIList(this).push('steps');
      }
  }

  class APIResourceRun extends APIResourceRunCommon {
      deviceSession(id) {
          return new APIResourceDeviceSession(this, id);
      }
  }

  class APIResourceProject extends APIResource {
      constructor(parent, id) {
          if (id == null) {
              throw new Error('Resource ID cannot be null!');
          }
          super(parent);
          this.push('projects', id);
      }
      runs() {
          return new APIList(this).push('runs');
      }
      run(id) {
          return new APIResourceRun(this, id);
      }
      share() {
          return new APIList(this).push('share');
      }
      unarchive() {
          return new APIResource(this).push('unarchive');
      }
  }

  let APIAdminResource = class APIAdminResource extends APIResource {
      constructor(parent) {
          super(parent);
      }
      accessGroups() {
          return new APIList(this).push('access-groups');
      }
      accessGroup(id) {
          return new APIResourceAccessGroup(this, id);
      }
      accounts() {
          return new APIList(this).push('admin', 'accounts');
      }
      account(id) {
          if (id == null) {
              throw new Error('Resource ID cannot be null!');
          }
          return new APIAdminResourceAccount(this, id);
      }
      accountServices() {
          return new APIList(this).push('admin', 'account-services');
      }
      accountService(id) {
          return new APIAdminResourceAccountService(this, id);
      }
      activities() {
          return new APIList(this).push('admin', 'activities');
      }
      administrators() {
          return new APIList(this).push('admin', 'administrators');
      }
      billingPeriods() {
          return new APIList(this).push('admin', 'billing-periods');
      }
      billingPeriod(id) {
          if (id == null) {
              throw new Error('Resource ID cannot be null!');
          }
          return new APIResource(this).push('admin', 'billing-periods', id);
      }
      browsers() {
          return new APIList(this).push('admin', 'browsers');
      }
      browser(id) {
          if (id == null) {
              throw new Error('Resource ID cannot be null!');
          }
          return new APIResource(this).push('admin', 'browsers', id);
      }
      clusters() {
          return new APIList(this).push('clusters');
      }
      cluster(id) {
          return new APIAdminResourceCluster(this, id);
      }
      devices() {
          return new APIAdminListDevices(this);
      }
      device(id) {
          return new APIAdminResourceDevice(this, id);
      }
      devicesForModel(id) {
          if (id == null) {
              throw new Error('Resource ID cannot be null!');
          }
          const apiList = this.devices();
          apiList.params({
              filter: 'deviceModelId_eq_' + id
          });
          return apiList;
      }
      deviceStatuses() {
          return new APIList(this).push('admin', 'device', 'statuses');
      }
      deviceModels() {
          return new APIList(this).push('admin', 'device-models');
      }
      deviceModel(id) {
          return new APIAdminResourceDeviceModel(this, id);
      }
      deviceProblems() {
          return new APIList(this).push('admin', 'device-problems');
      }
      deviceModelCriterias() {
          return new APIList(this).push('admin', 'device-model-criteria');
      }
      deviceModelCriteria(id) {
          if (id == null) {
              throw new Error('Resource ID cannot be null!');
          }
          return new APIResource(this).push('admin', 'device-model-criteria', id);
      }
      deviceSessions() {
          return new APIList(this).push('admin', 'device-sessions');
      }
      deviceSession(id) {
          return new APIAdminResourceDeviceSessionStandalone(this, id);
      }
      deviceTime() {
          return new APIAdminResourceDeviceTime(this);
      }
      deviceTimeSummary() {
          return new APIList(this).push('admin', 'device-time-summary');
      }
      deviceTypes() {
          return new APIList(this).push('admin', 'device-types');
      }
      deviceType(id) {
          return new APIResource(this).push('admin', 'device-types', id);
      }
      deviceGroups() {
          return new APIList(this).push('device-groups');
      }
      deviceGroup(id) {
          return new APIResourceDeviceGroup(this, id);
      }
      emails() {
          return new APIList(this).push('admin', 'emails');
      }
      resendEmail(id) {
          if (id == null) {
              throw new Error('Resource ID cannot be null!');
          }
          return new APIResource(this).push('admin', 'emails', id, 'resend').post();
      }
      files() {
          return new APIList(this).push('files');
      }
      file(id) {
          return new APIResourceFile(this, id);
      }
      frameworks() {
          return new APIList(this).push('admin', 'frameworks');
      }
      framework(id) {
          return new APIAdminResourceFramework(this, id);
      }
      frameworkAvailableLabels() {
          const apiList = this.frameworks();
          apiList.push('available-labels');
          return apiList;
      }
      interactiveQueue() {
          return new APIList(this).push('admin', 'interactive-queue');
      }
      licenses() {
          return new APIList(this).push('admin', 'licenses');
      }
      license(id) {
          return new APIAdminResourceLicense(this, id);
      }
      maintenance() {
          return new APIResource(this).push('admin', 'maintenance');
      }
      overview() {
          return new APIResource(this).push('admin', 'overview');
      }
      pools() {
          return new APIList(this).push('admin', 'pools');
      }
      pool(id) {
          return new APIResource(this).push('admin', 'pools', id);
      }
      projects() {
          return new APIList(this).push('projects');
      }
      project(id) {
          return new APIResourceProject(this, id);
      }
      roles() {
          return new APIList(this).push('admin', 'roles');
      }
      runs() {
          return new APIAdminListRuns(this);
      }
      run(id) {
          return new APIAdminResourceRunStandalone(this, id);
      }
      samples() {
          return new APIList(this).push('admin', 'samples');
      }
      sample(id) {
          if (id == null) {
              throw new Error('Resource ID cannot be null!');
          }
          return new APIResource(this).push('admin', 'samples', id);
      }
      services() {
          return new APIAdminListServices(this);
      }
      service(id) {
          return new APIAdminResourceService(this, id);
      }
      settings() {
          return new APIResource(this).push('admin', 'settings');
      }
      statistics() {
          return new APIAdminListStatistics(this);
      }
      users() {
          return new APIList(this).push('users');
      }
      createUser() {
          return new APIList(this).push('admin', 'users').post();
      }
      user(id) {
          return new APIAdminResourceUser(this, id);
      }
  };
  APIAdminResource = __decorate([
      NonRequestable
  ], APIAdminResource);

  class APIListDevices extends APIList {
      constructor(parent) {
          super(parent);
          this.push('devices');
      }
      filters() {
          return new APIResource(this).push('filters');
      }
      desktopBrowserCapabilities() {
          return new APIResource(this).push('desktop-browser-capabilities');
      }
  }

  class APIListProperties extends APIList {
      constructor(parent) {
          super(parent);
          this.push('properties');
      }
      maintenance() {
          return new APIList(this).params({
              filter: 'name_eq_CLOUD_HEADER_ANNOUNCEMENT',
              limit: 1,
              sort: 'updateTime_d'
          });
      }
  }

  class APIListServices extends APIList {
      constructor(parent) {
          super(parent);
          this.ALLOWED_HTTP_METHODS = ['POST'];
          this.push('services');
      }
      available() {
          return new APIList(this).push('available');
      }
      active() {
          const apiList = new APIList(this);
          if (this.first === 'me') {
              apiList.push('active');
          }
          else {
              apiList.params({
                  notArchived: true
              });
          }
          return apiList;
      }
      byPrice() {
          return new APIList(this).sort('centPrice');
      }
      availableByPrice() {
          return new APIList(this).push('available').sort('centPrice');
      }
  }

  class APIListUsers extends APIList {
      constructor(parent) {
          super(parent);
          this.ALLOWED_HTTP_METHODS = ['GET', 'POST'];
          this.push('users');
      }
      activate() {
          return new APIResource(this).push('activate').post();
      }
      recoveries() {
          return new APIResource(this).push('recoveries');
      }
      passwordRecovery() {
          return new APIResource(this).push('password-recovery');
      }
  }

  class APIResourceBillingPeriod extends APIResource {
      constructor(parent, id) {
          if (id == null) {
              throw new Error('Resource ID cannot be null!');
          }
          super(parent);
          this.push('billing-periods', id);
      }
      receipt() {
          return new APIResource(this).push('receipt').setRequestConfig({
              responseType: 'arraybuffer'
          });
      }
  }

  class APIResourceAccount extends APIResource {
      constructor(parent, id) {
          if (id == null) {
              throw new Error('Resource ID cannot be null!');
          }
          super(parent);
          this.push('accounts', id);
      }
      concurrencyStatus() {
          return new APIResource(this).push('concurrency-status');
      }
      deviceTime() {
          return new APIList(this).push('device-time');
      }
      deviceTimeSummary() {
          return new APIList(this).push('device-time-summary');
      }
      preferences() {
          return new APIResource(this).push('preferences');
      }
      users() {
          return new APIList(this).push('users');
      }
      removeUser(id) {
          return new APIResource(this).push('users', id);
      }
      disableUser(id) {
          return new APIResource(this).push('users', id, 'disable').post();
      }
      enableUser(id) {
          return new APIResource(this).push('users', id, 'enable').post();
      }
      resendActivation(id) {
          return new APIResource(this).push('users', id, 'resend-activation').post();
      }
      billingPeriods() {
          return new APIList(this).push('billing-periods');
      }
      billingPeriod(id) {
          return new APIResourceBillingPeriod(this, id);
      }
      serviceBillingPeriod(id) {
          if (id == null) {
              throw new Error('Resource ID cannot be null!');
          }
          return new APIResource(this).push('account-services', id, 'billing-period');
      }
      visualTestAccess() {
          return new APIResource(this).push('visual-tests', 'access');
      }
      accountServices() {
          return new APIList(this).push('account-services');
      }
      accountService(id) {
          return new APIList(this).push('account-services', id);
      }
      services() {
          return new APIResource(this).push('services');
      }
      userUsageDetails() {
          return new APIList(this).push('user-usage-details');
      }
      usageDetails() {
          return new APIList(this).push('usage-details');
      }
      usageDetailsSummary() {
          return new APIResource(this).push('usage-details-summary');
      }
  }

  class APIResourceBroker extends APIResource {
      constructor(parent) {
          super(parent);
          this.push('broker');
      }
      hubs() {
          return new APIList(this).push('hubs');
      }
  }

  class APIResourceDevice extends APIResource {
      constructor(parent, id) {
          if (id == null) {
              throw new Error('Resource ID cannot be null!');
          }
          super(parent);
          this.push('devices', id);
      }
      properties() {
          return new APIList(this).push('properties');
      }
      browsers() {
          return new APIList(this).push('browsers');
      }
  }

  class APIResourceLabelGroup extends APIResource {
      constructor(parent, id) {
          if (id == null) {
              throw new Error('Resource ID cannot be null!');
          }
          super(parent);
          this.push('label-groups', id);
      }
      labels() {
          return new APIList(this).push('labels');
      }
      label(id) {
          return new APIResource(this).push('labels', id);
      }
  }

  class APIListFiles extends APIList {
      constructor(parent) {
          super(parent);
          this.push('files');
      }
      upload(obj) {
          if (global.isNodeJs) {
              return this.nodeUpload(obj);
          }
          else {
              throw new Error('Not supported yet!');
          }
      }
      nodeUpload(file) {
          const fs = require('fs');
          const FormData = require('form-data');
          const form = new FormData();
          form.append('file', fs.createReadStream(file.dir + '/' + file.filename), {
              filename: file.filename
          });
          return this.post().headers(form.getHeaders()).data(form);
      }
  }

  class APIResourceChannel extends APIResource {
      constructor(parent, type) {
          if (type == null) {
              throw new Error('Resource ID cannot be null!');
          }
          super(parent);
          this.push('channels', type);
      }
      scopes() {
          return new APIList(this).push('scopes');
      }
  }

  class APIListNotifications extends APIList {
      constructor(parent) {
          super(parent);
          this.push('notifications');
      }
      scopes() {
          return new APIList(this).push('scopes');
      }
      channels() {
          return new APIList(this).push('channels');
      }
      channel(type) {
          return new APIResourceChannel(this, type);
      }
  }

  class APIListRuns extends APIList {
      constructor(parent) {
          super(parent);
          this.push('runs');
      }
      config() {
          return new APIResource(this).push('config');
      }
  }

  class APIListSmartbearTunnels extends APIList {
      constructor(parent) {
          super(parent);
          this.ALLOWED_HTTP_METHODS = ['GET'];
          this.push('tunnels');
      }
      active(active) {
          return this.params({ active: active });
      }
  }

  class APIResourceNotification extends APIResource {
      constructor(parent, id) {
          if (id == null) {
              throw new Error('Resource ID cannot be null!');
          }
          super(parent);
          this.push('notifications', id);
      }
      test() {
          return new APIResource(this).push('test');
      }
  }

  class APIResourceUser extends APIResource {
      constructor(parent, id) {
          if (id == null) {
              throw new Error('Resource ID cannot be null!');
          }
          super(parent);
          if (id === 'me') {
              this.push('me');
          }
          else if (typeof id === 'number') {
              this.push('users', id);
          }
          else {
              throw new TypeError('id is not a number');
          }
      }
      services() {
          return new APIListServices(this);
      }
      deviceGroups() {
          return new APIList(this).push('device-groups');
      }
      deviceGroup(id) {
          return new APIResourceDeviceGroup(this, id);
      }
      deviceSessions() {
          return new APIList(this).push('device-sessions');
      }
      deviceSession(id) {
          return new APIResourceDeviceSessionStandalone(this, id);
      }
      markAccountOwner() {
          return new APIResource(this).push('mark-account-owner').post();
      }
      projects() {
          return new APIList(this).push('projects');
      }
      project(id) {
          return new APIResourceProject(this, id);
      }
      files() {
          return new APIListFiles(this);
      }
      file(id) {
          return new APIResourceFile(this, id);
      }
      runs() {
          return new APIListRuns(this);
      }
      availableFrameworks() {
          return new APIList(this).push('available-frameworks');
      }
      resetApiKey() {
          return new APIResource(this).push('reset-api-key');
      }
      restore() {
          return new APIResource(this).push('restore');
      }
      feedback() {
          return new APIResource(this).push('feedback');
      }
      notifications() {
          return new APIListNotifications(this);
      }
      notification(id) {
          return new APIResourceNotification(this, id);
      }
      preferences() {
          return new APIResource(this).push('preferences');
      }
      uiPreferences() {
          return new APIResource(this).push('ui-preferences');
      }
      deviceUsage() {
          return new APIList(this).push('device-usage');
      }
      statistics() {
          return new APIResource(this).push('statistics');
      }
      deviceStatistics() {
          return new APIList(this).push('device-statistics');
      }
      accessGroups() {
          return new APIList(this).push('access-groups');
      }
      accessGroup(id) {
          return new APIResourceAccessGroup(this, id);
      }
      smartbearTunnel(id) {
          return new APIResource(this).push('tunnels', id);
      }
      smartbearTunnels() {
          return new APIListSmartbearTunnels(this);
      }
      deleteAccount() {
          return new APIResource(this).push('delete');
      }
  }

  class APIResourceUserSession extends APIResource {
      constructor(parent) {
          super(parent);
          this.push('user-sessions');
      }
      login(data) {
          return new APIResource(this).push('login').post().data(data);
      }
      logout() {
          return new APIResource(this).push('logout').post();
      }
      sso(name) {
          return new APIResource(this).push('oauth', 'authorize', name + '-login');
      }
      sbidCallbackUrl() {
          return new APIResource(this).push('oauth', 'authorize', 'sbid-login').toUrl(true);
      }
  }

  const axios = require('axios').default;
  if (globalThis.isNodeJs) {
      axios.defaults.headers.common['User-Agent'] = `Bitbar Cloud API Client for JavaScript v${version}`;
  }
  axios.defaults.maxContentLength = 1073741824;
  class API {
      get baseUrl() {
          return this.axiosConfig.baseURL;
      }
      constructor(config) {
          this.config = config;
          this.axiosConfig = {};
          if (config == null) {
              throw new Error('config cannot be empty');
          }
          else if (this.config.cloudUrl == null) {
              throw new TypeError('cloudUrl cannot be empty');
          }
          else if (typeof this.config.cloudUrl !== 'string') {
              throw new TypeError('cloudUrl must be a string');
          }
          else if (!/^https?:\/\/.{2,}/.test(this.config.cloudUrl)) {
              throw new Error(`cloudUrl doesn't look like a URL`);
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
                  throw new Error('apiKey is in the wrong format');
              }
              this.axiosConfig.auth = {
                  username: this.config.apiKey,
                  password: ''
              };
          }
          this.axiosConfig.withCredentials = config.withCredentials == null ? false : config.withCredentials;
          this.axios = axios.create(this.axiosConfig);
      }
      account(id) {
          return new APIResourceAccount(this, id);
      }
      admin() {
          return new APIAdminResource(this);
      }
      broker() {
          return new APIResourceBroker(this);
      }
      clusters() {
          return new APIList(this).push('clusters');
      }
      cluster(id) {
          return new APIAdminResourceCluster(this, id);
      }
      device(id) {
          return new APIResourceDevice(this, id);
      }
      deviceGroup(id) {
          return new APIResourceDeviceGroup(this, id);
      }
      deviceGroups() {
          return new APIList(this).push('device-groups');
      }
      devices() {
          return new APIListDevices(this);
      }
      deviceSession(id) {
          return new APIResourceDeviceSession(this, id);
      }
      deviceSessions() {
          return new APIList(this).push('device-sessions');
      }
      deviceStatistics() {
          return new APIList(this).push('device-statistics');
      }
      enums() {
          return new APIResource(this).push('enums');
      }
      files() {
          return new APIList(this).push('files');
      }
      file(id) {
          return new APIResourceFile(this, id);
      }
      labelGroups() {
          return new APIList(this).push('label-groups');
      }
      labelGroup(id) {
          return new APIResourceLabelGroup(this, id);
      }
      labels() {
          return new APIList(this).push('labels');
      }
      licenses() {
          return new APIResource(this).push('licenses');
      }
      license() {
          return new APIResource(this).push('license');
      }
      ma() {
          throw new Error('Requires prototype extension covering ACL check');
      }
      me() {
          return this.user('me');
      }
      projects() {
          return new APIList(this).push('projects');
      }
      project(id) {
          return new APIResourceProject(this, id);
      }
      properties() {
          return new APIListProperties(this);
      }
      property(id) {
          return new APIResource(this).push('properties', id);
      }
      run(id) {
          return new APIResourceRun(this, id);
      }
      services() {
          return new APIListServices(this);
      }
      user(id) {
          return new APIResourceUser(this, id);
      }
      users() {
          return new APIListUsers(this);
      }
      userSession() {
          return new APIResourceUserSession(this);
      }
  }

  const CloudAPIClient = {
      API,
      FilterBuilder
  };

  exports.AccessGroupScope = void 0;
  (function (AccessGroupScope) {
      AccessGroupScope["USER"] = "USER";
      AccessGroupScope["ACCOUNT"] = "ACCOUNT";
      AccessGroupScope["GLOBAL"] = "GLOBAL";
  })(exports.AccessGroupScope || (exports.AccessGroupScope = {}));

  exports.SessionUsageType = void 0;
  (function (SessionUsageType) {
      SessionUsageType["AUTOMATIC"] = "AUTOMATIC";
      SessionUsageType["MANUAL"] = "MANUAL";
      SessionUsageType["DEDICATED_AUTOMATIC"] = "DEDICATED_AUTOMATIC";
      SessionUsageType["DEDICATED_MANUAL"] = "DEDICATED_MANUAL";
  })(exports.SessionUsageType || (exports.SessionUsageType = {}));
  exports.UtilizationType = void 0;
  (function (UtilizationType) {
      UtilizationType["ALL"] = "all";
      UtilizationType["PUBLIC"] = "public";
      UtilizationType["DEDICATED"] = "dedicated";
  })(exports.UtilizationType || (exports.UtilizationType = {}));
  exports.SessionType = void 0;
  (function (SessionType) {
      SessionType["ALL"] = "all";
      SessionType["AUTOMATED"] = "automated";
      SessionType["MANUAL"] = "manual";
  })(exports.SessionType || (exports.SessionType = {}));
  exports.TimeResolution = void 0;
  (function (TimeResolution) {
      TimeResolution["HOUR"] = "hour";
      TimeResolution["DAY"] = "day";
  })(exports.TimeResolution || (exports.TimeResolution = {}));

  exports.PaymentStatus = void 0;
  (function (PaymentStatus) {
      PaymentStatus["SUCCEEDED"] = "SUCCEEDED";
      PaymentStatus["FAILED"] = "FAILED";
      PaymentStatus["REDIRECTED"] = "REDIRECTED";
  })(exports.PaymentStatus || (exports.PaymentStatus = {}));
  exports.PaymentMethod = void 0;
  (function (PaymentMethod) {
      PaymentMethod["PAYPAL"] = "PAYPAL";
      PaymentMethod["BRAINTREE"] = "BRAINTREE";
      PaymentMethod["STRIPE"] = "STRIPE";
      PaymentMethod["INVOICE"] = "INVOICE";
      PaymentMethod["PROMOTION"] = "PROMOTION";
      PaymentMethod["AWS"] = "AWS";
  })(exports.PaymentMethod || (exports.PaymentMethod = {}));
  exports.DeactivateReason = void 0;
  (function (DeactivateReason) {
      DeactivateReason["INITIAL_FAILURE"] = "INITIAL_FAILURE";
      DeactivateReason["SCA_FAILURE"] = "SCA_FAILURE";
      DeactivateReason["CHARGE_FAILURE"] = "CHARGE_FAILURE";
      DeactivateReason["CANCEL"] = "CANCEL";
      DeactivateReason["SUSPENDED"] = "SUSPENDED";
      DeactivateReason["ANOTHER_PURCHASE"] = "ANOTHER_PURCHASE";
  })(exports.DeactivateReason || (exports.DeactivateReason = {}));

  exports.InitStep = void 0;
  (function (InitStep) {
      InitStep["SKIP"] = "SKIP";
      InitStep["REBOOT"] = "REBOOT";
      InitStep["REBOOT_WITH_UNLOCK"] = "REBOOT_WITH_UNLOCK";
      InitStep["UNLOCK_ONLY"] = "UNLOCK_ONLY";
  })(exports.InitStep || (exports.InitStep = {}));
  exports.DeviceState = void 0;
  (function (DeviceState) {
      DeviceState["OFFLINE_CLEANING"] = "OFFLINE_CLEANING";
      DeviceState["OFFLINE_DIRTY"] = "OFFLINE_DIRTY";
      DeviceState["OFFLINE_FREE"] = "OFFLINE_FREE";
      DeviceState["OFFLINE_TESTING"] = "OFFLINE_TESTING";
      DeviceState["ONLINE_CLEANING"] = "ONLINE_CLEANING";
      DeviceState["ONLINE_DIRTY"] = "ONLINE_DIRTY";
      DeviceState["ONLINE_FREE"] = "ONLINE_FREE";
      DeviceState["ONLINE_TESTING"] = "ONLINE_TESTING";
  })(exports.DeviceState || (exports.DeviceState = {}));

  exports.FrameworkType = void 0;
  (function (FrameworkType) {
      FrameworkType["AUTOMATIC"] = "AUTOMATIC";
      FrameworkType["MANUAL_APP"] = "MANUAL_APP";
      FrameworkType["MANUAL_WEB"] = "MANUAL_WEB";
      FrameworkType["REMOTE"] = "REMOTE";
  })(exports.FrameworkType || (exports.FrameworkType = {}));

  exports.BillingType = void 0;
  (function (BillingType) {
      BillingType["BUY"] = "BUY";
      BillingType["CHARGE"] = "CHARGE";
      BillingType["CANCEL"] = "CANCEL";
  })(exports.BillingType || (exports.BillingType = {}));

  exports.BrokerType = void 0;
  (function (BrokerType) {
      BrokerType["MOBILE"] = "MOBILE";
      BrokerType["DESKTOP"] = "DESKTOP";
  })(exports.BrokerType || (exports.BrokerType = {}));

  exports.ClusterState = void 0;
  (function (ClusterState) {
      ClusterState[ClusterState["OFFLINE"] = 0] = "OFFLINE";
      ClusterState["ONLINE"] = "ONLINE";
      ClusterState["RESTARTING"] = "RESTARTING";
      ClusterState["QUIET_DOWN"] = "QUIET_DOWN";
      ClusterState["MAINTENANCE"] = "MAINTENANCE";
  })(exports.ClusterState || (exports.ClusterState = {}));
  exports.ClusterType = void 0;
  (function (ClusterType) {
      ClusterType["BARE_METAL"] = "BARE_METAL";
      ClusterType["EC2"] = "EC2";
      ClusterType["VM"] = "VM";
  })(exports.ClusterType || (exports.ClusterType = {}));

  exports.DeviceGroupOrigin = void 0;
  (function (DeviceGroupOrigin) {
      DeviceGroupOrigin["STATIC"] = "STATIC";
      DeviceGroupOrigin["DYNAMIC"] = "DYNAMIC";
      DeviceGroupOrigin["HYBRID"] = "HYBRID";
  })(exports.DeviceGroupOrigin || (exports.DeviceGroupOrigin = {}));
  exports.Platform = void 0;
  (function (Platform) {
      Platform["IOS"] = "IOS";
      Platform["ANDROID"] = "ANDROID";
      Platform["WINDOWS"] = "WINDOWS";
      Platform["MAC"] = "MAC";
      Platform["LINUX"] = "LINUX";
      Platform["UNDEFINED"] = "UNDEFINED";
  })(exports.Platform || (exports.Platform = {}));
  exports.SupportedCreators = void 0;
  (function (SupportedCreators) {
      SupportedCreators["MANUAL"] = "MANUAL";
      SupportedCreators["ROBOT"] = "ROBOT";
      SupportedCreators["AUTOMATIC"] = "AUTOMATIC";
  })(exports.SupportedCreators || (exports.SupportedCreators = {}));
  exports.PoolSize = void 0;
  (function (PoolSize) {
      PoolSize["XL"] = "XL";
      PoolSize["L"] = "L";
      PoolSize["M"] = "M";
      PoolSize["S"] = "S";
  })(exports.PoolSize || (exports.PoolSize = {}));
  exports.Code = void 0;
  (function (Code) {
      Code["HIGH"] = "HIGH";
      Code["MODERATE"] = "MODERATE";
      Code["LOW"] = "LOW";
      Code["NONE"] = "NONE";
  })(exports.Code || (exports.Code = {}));
  exports.LockReason = void 0;
  (function (LockReason) {
      LockReason["TESTING"] = "TESTING";
      LockReason["CLEANING"] = "CLEANING";
      LockReason["NOT_OPERATIONAL"] = "NOT_OPERATIONAL";
  })(exports.LockReason || (exports.LockReason = {}));

  exports.CriterionField = void 0;
  (function (CriterionField) {
      CriterionField["NAME"] = "NAME";
      CriterionField["FINGERPRINT"] = "FINGERPRINT";
      CriterionField["SERIAL_ID"] = "SERIAL_ID";
      CriterionField["UNLOCK_GESTURE"] = "UNLOCK_GESTURE";
      CriterionField["SOFTWARE_VERSION"] = "SOFTWARE_VERSION";
      CriterionField["INIT_STEP"] = "INIT_STEP";
      CriterionField["ACCOUNT"] = "ACCOUNT";
      CriterionField["BROWSERS"] = "BROWSERS";
  })(exports.CriterionField || (exports.CriterionField = {}));

  exports.RetentionStrategy = void 0;
  (function (RetentionStrategy) {
      RetentionStrategy["CLUSTER_ON_OFF"] = "CLUSTER_ON_OFF";
      RetentionStrategy["MIN_FREE_MAX_TOTAL"] = "MIN_FREE_MAX_TOTAL";
      RetentionStrategy["POOL_MANAGER_AWARE"] = "POOL_MANAGER_AWARE";
  })(exports.RetentionStrategy || (exports.RetentionStrategy = {}));

  exports.ProblemType = void 0;
  (function (ProblemType) {
      ProblemType["CLEANING"] = "CLEANING";
      ProblemType["DIRTY"] = "DIRTY";
      ProblemType["OFFLINE"] = "OFFLINE";
      ProblemType["LOW_BATTERY"] = "LOW_BATTERY";
      ProblemType["HIGH_FAIL_RATE"] = "HIGH_FAIL_RATE";
      ProblemType["NO_INTERNET_CONNECTION"] = "NO_INTERNET_CONNECTION";
  })(exports.ProblemType || (exports.ProblemType = {}));

  exports.DeviceSessionType = void 0;
  (function (DeviceSessionType) {
      DeviceSessionType["AUTOMATIC"] = "AUTOMATIC";
      DeviceSessionType["MANUAL_APP"] = "MANUAL_APP";
      DeviceSessionType["MANUAL_WEB"] = "MANUAL_WEB";
  })(exports.DeviceSessionType || (exports.DeviceSessionType = {}));
  exports.RetryState = void 0;
  (function (RetryState) {
      RetryState["NONE"] = "NONE";
      RetryState["MANUAL"] = "MANUAL";
      RetryState["AUTO"] = "AUTO";
  })(exports.RetryState || (exports.RetryState = {}));
  exports.DeviceSessionState = void 0;
  (function (DeviceSessionState) {
      DeviceSessionState["ABORTED"] = "ABORTED";
      DeviceSessionState["EXCLUDED"] = "EXCLUDED";
      DeviceSessionState["FAILED"] = "FAILED";
      DeviceSessionState["RUNNING"] = "RUNNING";
      DeviceSessionState["SUCCEEDED"] = "SUCCEEDED";
      DeviceSessionState["TIMEOUT"] = "TIMEOUT";
      DeviceSessionState["WAITING"] = "WAITING";
      DeviceSessionState["WARNING"] = "WARNING";
  })(exports.DeviceSessionState || (exports.DeviceSessionState = {}));
  exports.DeviceSessionStepType = void 0;
  (function (DeviceSessionStepType) {
      DeviceSessionStepType["WAITING"] = "WAITING";
      DeviceSessionStepType["PREPARING"] = "PREPARING";
      DeviceSessionStepType["UNINSTALL"] = "UNINSTALL";
      DeviceSessionStepType["INSTALL"] = "INSTALL";
      DeviceSessionStepType["RUNNING"] = "RUNNING";
      DeviceSessionStepType["SENDING_RESULTS"] = "SENDING_RESULTS";
      DeviceSessionStepType["PROCESSING_RESULTS"] = "PROCESSING_RESULTS";
  })(exports.DeviceSessionStepType || (exports.DeviceSessionStepType = {}));
  exports.SessionReleaseReason = void 0;
  (function (SessionReleaseReason) {
      SessionReleaseReason["INACTIVITY"] = "INACTIVITY";
      SessionReleaseReason["TIMEOUT"] = "TIMEOUT";
      SessionReleaseReason["USER_ACTION"] = "USER_ACTION";
      SessionReleaseReason["CHANGE_DEVICE"] = "CHANGE_DEVICE";
      SessionReleaseReason["WEBSOCKET_CLOSED"] = "WEBSOCKET_CLOSED";
  })(exports.SessionReleaseReason || (exports.SessionReleaseReason = {}));

  exports.OsType = void 0;
  (function (OsType) {
      OsType["IOS"] = "IOS";
      OsType["ANDROID"] = "ANDROID";
      OsType["DESKTOP"] = "DESKTOP";
      OsType["UNDEFINED"] = "UNDEFINED";
  })(exports.OsType || (exports.OsType = {}));

  exports.LicenseStatus = void 0;
  (function (LicenseStatus) {
      LicenseStatus["ACTIVE"] = "ACTIVE";
      LicenseStatus["EXPIRED"] = "EXPIRED";
      LicenseStatus["INACTIVE"] = "INACTIVE";
      LicenseStatus["CLOSED"] = "CLOSED";
  })(exports.LicenseStatus || (exports.LicenseStatus = {}));

  exports.NotificationChannel = void 0;
  (function (NotificationChannel) {
      NotificationChannel["SLACK"] = "SLACK";
      NotificationChannel["EMAIL"] = "EMAIL";
      NotificationChannel["WEBHOOK"] = "WEBHOOK";
  })(exports.NotificationChannel || (exports.NotificationChannel = {}));
  exports.NotificationScope = void 0;
  (function (NotificationScope) {
      NotificationScope["ALL"] = "ALL";
      NotificationScope["TEST_RUN"] = "TEST_RUN";
      NotificationScope["TEST_RUN_FAILURE"] = "TEST_RUN_FAILURE";
      NotificationScope["TEST_RUN_SUCCEEDED"] = "TEST_RUN_SUCCEEDED";
      NotificationScope["SYSTEM"] = "SYSTEM";
      NotificationScope["CHECK"] = "CHECK";
  })(exports.NotificationScope || (exports.NotificationScope = {}));

  exports.ArchivingStrategy = void 0;
  (function (ArchivingStrategy) {
      ArchivingStrategy["NEVER"] = "NEVER";
      ArchivingStrategy["DAYS"] = "DAYS";
      ArchivingStrategy["RUNS"] = "RUNS";
  })(exports.ArchivingStrategy || (exports.ArchivingStrategy = {}));

  exports.ScreenshotType = void 0;
  (function (ScreenshotType) {
      ScreenshotType["LANDSCAPE"] = "LANDSCAPE";
      ScreenshotType["PORTRAIT"] = "PORTRAIT";
  })(exports.ScreenshotType || (exports.ScreenshotType = {}));

  exports.ServiceUnit = void 0;
  (function (ServiceUnit) {
      ServiceUnit["DAY"] = "DAY";
      ServiceUnit["HOUR"] = "HOUR";
      ServiceUnit["MONTH"] = "MONTH";
      ServiceUnit["PROJECT"] = "PROJECT";
      ServiceUnit["RUN"] = "RUN";
      ServiceUnit["YEAR"] = "YEAR";
  })(exports.ServiceUnit || (exports.ServiceUnit = {}));

  exports.SharedResourceType = void 0;
  (function (SharedResourceType) {
      SharedResourceType["DEVICE_GROUP"] = "DEVICE_GROUP";
      SharedResourceType["FILE"] = "FILE";
      SharedResourceType["PROJECT"] = "PROJECT";
  })(exports.SharedResourceType || (exports.SharedResourceType = {}));

  exports.TestResult = void 0;
  (function (TestResult) {
      TestResult["PASSED"] = "PASSED";
      TestResult["FAILED"] = "FAILED";
      TestResult["SKIPPED"] = "SKIPPED";
      TestResult["NOT_AVAILABLE"] = "NOT_AVAILABLE";
  })(exports.TestResult || (exports.TestResult = {}));

  exports.LimitationType = void 0;
  (function (LimitationType) {
      LimitationType["PACKAGE"] = "PACKAGE";
      LimitationType["CLASS"] = "CLASS";
  })(exports.LimitationType || (exports.LimitationType = {}));
  exports.TestScheduler = void 0;
  (function (TestScheduler) {
      TestScheduler["PARALLEL"] = "PARALLEL";
      TestScheduler["SERIAL"] = "SERIAL";
      TestScheduler["SINGLE"] = "SINGLE";
      TestScheduler["ALL_INSTANCES"] = "ALL_INSTANCES";
  })(exports.TestScheduler || (exports.TestScheduler = {}));
  exports.TestState = void 0;
  (function (TestState) {
      TestState["WAITING"] = "WAITING";
      TestState["RUNNING"] = "RUNNING";
      TestState["FINISHED"] = "FINISHED";
  })(exports.TestState || (exports.TestState = {}));
  exports.TestRunConfigFileAction = void 0;
  (function (TestRunConfigFileAction) {
      TestRunConfigFileAction["COPY_TO_DEVICE"] = "COPY_TO_DEVICE";
      TestRunConfigFileAction["INSTALL"] = "INSTALL";
      TestRunConfigFileAction["RUN_TEST"] = "RUN_TEST";
  })(exports.TestRunConfigFileAction || (exports.TestRunConfigFileAction = {}));

  exports.UserStatus = void 0;
  (function (UserStatus) {
      UserStatus["INACTIVE"] = "INACTIVE";
      UserStatus["DISABLED"] = "DISABLED";
      UserStatus["ENABLED"] = "ENABLED";
  })(exports.UserStatus || (exports.UserStatus = {}));

  exports.FileDirection = void 0;
  (function (FileDirection) {
      FileDirection["INPUT"] = "INPUT";
      FileDirection["OUTPUT"] = "OUTPUT";
  })(exports.FileDirection || (exports.FileDirection = {}));
  exports.FileInputType = void 0;
  (function (FileInputType) {
      FileInputType["APPLICATION"] = "APPLICATION";
      FileInputType["TEST"] = "TEST";
      FileInputType["DATA"] = "DATA";
  })(exports.FileInputType || (exports.FileInputType = {}));
  exports.FileState = void 0;
  (function (FileState) {
      FileState["PREPARING"] = "PREPARING";
      FileState["READY"] = "READY";
  })(exports.FileState || (exports.FileState = {}));

  exports.VisualTestImageType = void 0;
  (function (VisualTestImageType) {
      VisualTestImageType["FULL_PAGE"] = "FULL_PAGE";
      VisualTestImageType["VIEWPORT"] = "VIEWPORT";
      VisualTestImageType["ELEMENT_SCREENSHOT"] = "ELEMENT_SCREENSHOT";
  })(exports.VisualTestImageType || (exports.VisualTestImageType = {}));

  exports.ALLOWED_HTTP_METHODS = ALLOWED_HTTP_METHODS;
  exports.API = API;
  exports.CloudAPIClient = CloudAPIClient;
  exports.FilterBuilder = FilterBuilder;
  exports.IMAGE_FILES_FILTER = IMAGE_FILES_FILTER;
  exports.NON_MEDIA_FILES_FILTER = NON_MEDIA_FILES_FILTER;
  exports.default = CloudAPIClient;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=bitbar-cloud-api-client.js.map

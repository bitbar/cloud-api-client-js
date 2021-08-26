/* @bitbar/cloud-api-client v0.49.0 | Copyright 2021 (c) SmartBear Software and contributors | .git/blob/master/LICENSE */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('@bitbar/finka'), require('axios'), require('qs')) :
  typeof define === 'function' && define.amd ? define(['@bitbar/finka', 'axios', 'qs'], factory) :
  (global = global || self, global['bitbar-cloud-api-client'] = factory(global['@bitbar/finka'], global.axios, global.qs));
}(this, (function (finka, axios, qs) { 'use strict';

  finka = finka && Object.prototype.hasOwnProperty.call(finka, 'default') ? finka['default'] : finka;
  axios = axios && Object.prototype.hasOwnProperty.call(axios, 'default') ? axios['default'] : axios;
  qs = qs && Object.prototype.hasOwnProperty.call(qs, 'default') ? qs['default'] : qs;

  finka();

  var version = "0.49.0";

  var ALLOWED_HTTP_METHODS;
  (function (ALLOWED_HTTP_METHODS) {
      ALLOWED_HTTP_METHODS["GET"] = "GET";
      ALLOWED_HTTP_METHODS["POST"] = "POST";
      ALLOWED_HTTP_METHODS["DELETE"] = "DELETE";
  })(ALLOWED_HTTP_METHODS || (ALLOWED_HTTP_METHODS = {}));
  class APIEntity {
      constructor(parent) {
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
          }
          else {
              this.root = parent;
          }
      }
      push(...items) {
          for (const item of items) {
              this.stack.push(item);
          }
          return this;
      }
      pop() {
          this.stack.pop();
          return this;
      }
      shift() {
          this.stack.shift();
          return this;
      }
      unshift(...items) {
          for (const item of items) {
              this.stack.unshift(item);
          }
          return this;
      }
      restack(...items) {
          this.stack = items;
          return this;
      }
      get first() {
          return this.stack[0];
      }
      set first(val) {
          this.stack[0] = val;
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
              url = this.root.axiosConfig.baseURL + url;
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
          if (!ALLOWED_HTTP_METHODS[NAME]) {
              throw new Error(`Method '${NAME}' is not allowed! You can use: ${Object.keys(ALLOWED_HTTP_METHODS).join(', ')}`);
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
      params(params) {
          Object.deepAssign(this.requestConfig, {
              params
          });
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
          Object.deepAssign(this.requestConfig, {
              data
          });
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
      paramsSerializer(params) {
          return qs.stringify(params, {
              arrayFormat: 'brackets'
          });
      }
      send() {
          const requestConfig = Object.deepAssign({}, this.requestConfig, {
              url: `/${this.stack.join('/')}`
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
              requestConfig.data = qs.stringify(requestConfig.data, {
                  arrayFormat: 'brackets'
              });
          }
          if (requestConfig.params) {
              requestConfig.paramsSerializer = this.paramsSerializer;
          }
          return this.root.axios.request(requestConfig);
      }
  }

  class Filter {
      constructor(name, value, operand) {
          this.name = name;
          this.value = value;
          this.operand = operand;
      }
  }

  class FilterBuilder {
      constructor() {
          this.filters = [];
      }
      add(name, value, operand, checkNull = false) {
          value = Array.wrap(value);
          if (value.length === 0) {
              return this;
          }
          for (let i = 0; i < value.length; i++) {
              const v = value[i];
              if (typeof v === 'object' && v instanceof Date) {
                  value[i] = v.getTime();
              }
          }
          if (checkNull) {
              for (const v of value) {
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
  }

  const DEFAULT_LIMIT = 20;
  const DEFAULT_OFFSET = 0;
  var APIOrder;
  (function (APIOrder) {
      APIOrder["asc"] = "a";
      APIOrder["desc"] = "d";
  })(APIOrder || (APIOrder = {}));
  class APIList extends APIEntity {
      create(data) {
          return this.post().data(data).send();
      }
      sort(name, order = APIOrder.asc) {
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
          if (isFilterBuilder) {
              filter = filter.toString();
          }
          return this.params({
              filter
          });
      }
  }
  APIList.prototype.all = APIList.prototype.noLimit;
  APIList.prototype.cut = APIList.prototype.between;

  class APIResource extends APIEntity {
      delete() {
          return this.method('DELETE');
      }
  }

  class APIListCleanupConfigurations extends APIList {
      constructor(parent) {
          super(parent);
          this.push('cleanup-configurations');
      }
      specific() {
          return new APIResource(this).push('specific');
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

  class APIListDevices extends APIList {
      constructor(parent) {
          super(parent);
          this.push('devices');
      }
      filters() {
          return new APIResource(this).push('filters');
      }
      cleanupConfigurations() {
          return new APIListCleanupConfigurations(this);
      }
      cleanupConfiguration(id) {
          return new APIResourceCleanupConfiguration(this, id);
      }
      desktopBrowserCapabilities() {
          return new APIResource(this).push('desktop-browser-capabilities');
      }
  }

  class APIListUsers extends APIList {
      constructor(parent) {
          super(parent);
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
      resetApiKey() {
          return new APIResource(this).push('reset-api-key');
      }
      validateVatId() {
          return new APIResource(this).push('validateVatId');
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

  class APIResourceBuild extends APIResource {
      constructor(parent, id) {
          if (id == null) {
              throw new Error('Resource ID cannot be null!');
          }
          super(parent);
          this.push('builds', id);
      }
      abort() {
          return new APIResource(this).push('abort');
      }
      outputFiles() {
          return new APIList(this).push('output-file-set', 'files');
      }
  }

  class APIResourceJob extends APIResource {
      constructor(parent, id) {
          if (id == null) {
              throw new Error('Resource ID cannot be null!');
          }
          super(parent);
          this.push('jobs', id);
      }
      builds() {
          return new APIList(this).push('builds');
      }
      build(id) {
          return new APIResourceBuild(this, id);
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
      dataAvailability() {
          return new APIList(this).push('data-availability');
      }
      deviceSessions() {
          return new APIList(this).push('device-sessions');
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
      screenshotNames() {
          return new APIList(this).push('screenshot-names');
      }
      screenshots() {
          return new APIList(this).push('screenshots');
      }
      screenshotsZip(ids) {
          return postDeviceRunIds(this, 'screenshots.zip', ids);
      }
      steps() {
          return new APIList(this).push('steps');
      }
      tags() {
          return new APIList(this).push('tags');
      }
      tag(id) {
          if (id == null) {
              throw new Error('Resource ID cannot be null!');
          }
          return new APIResource(this).push('tags', id);
      }
  }

  class InputFileset extends APIResource {
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
  }

  const NON_MEDIA_FILES_FILTER = new FilterBuilder();
  NON_MEDIA_FILES_FILTER.eq('state', 'READY');
  NON_MEDIA_FILES_FILTER.notin('mimetype', [
      'image/png', 'image/jpg', 'image/jpeg', 'image/webp', 'image/gif',
      'video/mp4', 'video/avi', 'video/webm', 'video/ogg', 'video/mpeg'
  ]);
  class OutputFileset extends APIResource {
      constructor(parent) {
          super(parent);
          this.push('output-file-set');
      }
      files() {
          return new APIList(this).push('files');
      }
      file(id) {
          if (id == null) {
              throw new Error('Resource ID cannot be null!');
          }
          return new APIResource(this).push('files', id);
      }
      filesZip() {
          return new APIResource(this).push('files.zip');
      }
      screenshots() {
          return new APIList(this).push('screenshots');
      }
      screenshot(id) {
          if (id == null) {
              throw new Error('Resource ID cannot be null!');
          }
          return new APIResource(this).push('screenshots', id);
      }
      screenshotFile(id) {
          this.screenshot(id).push('file');
      }
      videos() {
          return this.files().params({
              filter: 's_state_eq_READY',
              tag: ['video']
          });
      }
      nonMediaFiles() {
          return this.files().filter(NON_MEDIA_FILES_FILTER);
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
          return new InputFileset(this);
      }
      output() {
          return new OutputFileset(this);
      }
      screenshots() {
          return new APIList(this).push('screenshots');
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
      testCaseRuns() {
          return new APIList(this).push('test-case-runs');
      }
  }

  class APIResourceDeviceSession extends APIResourceDeviceSessionCommon {
      abort() {
          return new APIResource(this).push('abort').post();
      }
      retry() {
          return new APIResource(this).push('retry').post();
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
      runsExtended() {
          return new APIList(this).push('runs-extended');
      }
      runExtended(id) {
          if (id == null) {
              throw new Error('Resource ID cannot be null!');
          }
          return new APIResource(this).push('runs-extended', id);
      }
      files() {
          return new APIList(this).push('files');
      }
      filesZip() {
          return new APIResource(this).push('files.zip');
      }
      sharings() {
          return new APIList(this).push('sharings');
      }
      sharing(id) {
          if (id == null) {
              throw new Error('Resource ID cannot be null!');
          }
          return new APIResource(this).push('sharings', id);
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

  class APIResourceAdditionalUser extends APIResource {
      constructor(parent, id) {
          if (id == null) {
              throw new Error('Resource ID cannot be null!');
          }
          super(parent);
          this.push('additional-users', id);
      }
      resendActivation() {
          return new APIResource(this).push('resend-activation');
      }
  }

  class APIUserResourceAccount extends APIResource {
      constructor(parent) {
          super(parent);
          this.push('account');
      }
      additionalUsers() {
          return new APIList(this).push('additional-users');
      }
      additionalUser(id) {
          return new APIResourceAdditionalUser(this, id);
      }
      serviceBillingPeriod(id) {
          if (id == null) {
              throw new Error('Resource ID cannot be null!');
          }
          const a = new APIResource(this);
          a.last += '-services';
          a.push(id, 'billing-period');
          return a;
      }
  }

  class APIListDeviceTime extends APIList {
      constructor(parent) {
          super(parent);
          this.push('device-time');
      }
      reserved() {
          return new APIList(this).push('reserved');
      }
      used() {
          return new APIList(this).push('used');
      }
  }

  class APIListFiles extends APIList {
      constructor(parent) {
          super(parent);
          this.push('files');
      }
      upload(obj) {
          let form;
          if (global.isNodeJs) {
              const fs = require('fs');
              const FormData = require('form-data');
              form = new FormData();
              form.append('file', fs.createReadStream(obj.dir + '/' + obj.filename), {
                  filename: obj.filename
              });
          }
          else {
              throw new Error('Not supported yet!');
          }
          return this.post().headers(form.getHeaders()).data(form);
      }
  }

  class APIListPurchased extends APIList {
      constructor(parent) {
          super(parent);
          this.push('purchased');
      }
  }

  class APIListServices extends APIList {
      constructor(parent) {
          super(parent);
          this.push('services');
      }
      purchased() {
          return new APIListPurchased(this);
      }
      available() {
          return new APIList(this).push('available');
      }
      active() {
          const a = new APIList(this);
          if (this.first === 'me') {
              a.push('active');
          }
          else {
              a.params({
                  notArchived: true
              });
          }
          return a;
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
  }

  class APIListSmartbearTunnels extends APIList {
      constructor(parent) {
          super(parent);
          this.push('tunnels');
      }
      active(active) {
          return this.params({ active: active });
      }
  }

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
          return new InputFileset(this);
      }
      output() {
          return new OutputFileset(this);
      }
      release() {
          return new APIResource(this).push('release').post();
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
      account() {
          return new APIUserResourceAccount(this);
      }
      deviceTime() {
          return new APIListDeviceTime(this);
      }
      deviceTimeSummary() {
          return new APIList(this).push('device-time-summary');
      }
      services() {
          return new APIListServices(this);
      }
      service(id) {
          if (id == null) {
              throw new Error('Resource ID cannot be null!');
          }
          return new APIResource(this).push('services', id);
      }
      billingPeriods() {
          return new APIList(this).push('billing-periods');
      }
      billingPeriod(id) {
          return new APIResourceBillingPeriod(this, id);
      }
      jobs() {
          return new APIList(this).push('jobs');
      }
      job(id) {
          return new APIResourceJob(this, id);
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
      availableBuildExecutors() {
          return new APIList(this).push('available-build-executors');
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
      receipts() {
          return new APIList(this).push('receipts');
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
          return new APIList(this).push('statistics');
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
          return new APIResource(this).push(name + '-login');
      }
      portalLogin() {
          return new APIResource(this).push('portal-login').post();
      }
  }

  class APIAdminListRuns extends APIList {
      constructor(parent) {
          super(parent);
          this.push('admin', 'runs');
      }
      config() {
          const a = new APIResource(this);
          a.stack = ['runs', 'config'];
          return a;
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

  class APIAdminResourceDeviceTime extends APIResource {
      constructor(parent) {
          super(parent);
          this.push('admin', 'device-time');
      }
      countSessionReport() {
          return new APIList(this).push('count-session-report');
      }
      stepTimeReport() {
          return new APIList(this).push('step-time-report');
      }
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
          return new APIResource(this).push('changepriority').post().params({
              priority
          });
      }
      retry(ids) {
          return postDeviceRunIds(this, 'retry', ids).setRequestConfig({
              timeout: 0
          });
      }
      deviceSessions() {
          return new APIList(this).shift().push('device-sessions');
      }
      deviceSession(id) {
          return new APIResourceDeviceSessionCommon(this, id).shift();
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
      queue() {
          return new APIList(this).push('queue');
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
      blink() {
          return new APIResource(this).push('blink').post();
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

  class APIAdminResourceUserAccount extends APIResource {
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
  }

  class APIAdminResourceUser extends APIResource {
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
  }

  function postAdminDeviceSessionChangeBillable(parent, billable) {
      const a = new APIResource(parent);
      const deviceSessionId = a.last;
      return a.restack('admin', 'device-sessions', deviceSessionId, 'changebillable').params({
          billable
      }).post();
  }

  class APIAdminResourceDeviceSessionStandalone extends APIResourceDeviceSessionCommon {
      changeBillable(billable) {
          return postAdminDeviceSessionChangeBillable(this, billable);
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
      release() {
          return new APIResource(this).push('release').post();
      }
  }

  class APIAdminListDevices extends APIList {
      constructor(parent) {
          super(parent);
          this.push('admin', 'devices');
      }
      filters() {
          return new APIResource(this).push('filters');
      }
      cleanupConfigurations() {
          return new APIListCleanupConfigurations(this);
      }
      cleanupConfiguration(id) {
          return new APIResourceCleanupConfiguration(this, id);
      }
      desktopBrowserCapabilities() {
          return new APIResource(this).push('desktop-browser-capabilities');
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

  class APIAdminListNotificationPlans extends APIList {
      constructor(parent) {
          super(parent);
          this.push('admin', 'notification-plans');
      }
      channels() {
          return new APIList(this).push('channels');
      }
      scopes() {
          return new APIList(this).push('scopes');
      }
  }

  class APIAdminResourceNotificationPlan extends APIResource {
      constructor(parent, id) {
          if (id == null) {
              throw new Error('Resource ID cannot be null!');
          }
          super(parent);
          this.push('admin', 'notification-plans', id);
      }
      check() {
          return new APIList(this).push('check');
      }
      test() {
          return new APIResource(this).push('test');
      }
      execute() {
          return new APIResource(this).push('execute');
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
      deactivate() {
          return new APIResource(this).push('deactivate').post();
      }
      roles() {
          return new APIList(this).push('roles');
      }
  }

  class APIAdminResource extends APIResource {
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
          return new APIResource(this).push('admin', 'accounts', id);
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
      billingPeriods() {
          return new APIList(this).push('admin', 'billing-periods');
      }
      billingPeriod(id) {
          if (id == null) {
              throw new Error('Resource ID cannot be null!');
          }
          return new APIResource(this).push('admin', 'billing-periods', id);
      }
      pools() {
          return new APIList(this).push('admin', 'pools');
      }
      pool(id) {
          return new APIResource(this).push('admin', 'pools', id);
      }
      clusters() {
          return new APIList(this).push('clusters');
      }
      cluster(id) {
          return new APIAdminResourceCluster(this, id);
      }
      countryVatRates() {
          return new APIList(this).push('admin', 'country-vat-rates');
      }
      countryVatRate(id) {
          if (id == null) {
              throw new Error('Resource ID cannot be null!');
          }
          return new APIResource(this).push('admin', 'country-vat-rates', id);
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
          const a = this.devices();
          a.params({
              filter: 'deviceModelId_eq_' + id
          });
          return a;
      }
      deviceStatuses() {
          return new APIList(this).push('admin', 'device', 'statuses');
      }
      deviceModels() {
          return new APIList(this).push('admin', 'device-models');
      }
      deviceModel(id) {
          if (id == null) {
              throw new Error('Resource ID cannot be null!');
          }
          return new APIResource(this).push('admin', 'device-models', id);
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
      interactiveQueue() {
          return new APIList(this).push('admin', 'interactive-queue');
      }
      files() {
          return new APIList(this).push('files');
      }
      file(id) {
          return new APIResourceFile(this, id);
      }
      overview() {
          return new APIResource(this).push('admin', 'overview');
      }
      projects() {
          return new APIList(this).push('projects');
      }
      project(id) {
          return new APIResourceProject(this, id);
      }
      runs() {
          return new APIAdminListRuns(this);
      }
      run(id) {
          return new APIAdminResourceRunStandalone(this, id);
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
      maintenance() {
          return new APIResource(this).push('admin', 'maintenance');
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
      frameworks() {
          return new APIList(this).push('admin', 'frameworks');
      }
      framework(id) {
          return new APIAdminResourceFramework(this, id);
      }
      frameworkAvailableLabels() {
          const a = this.frameworks();
          a.push('available-labels');
          return a;
      }
      errors() {
          return new APIList(this).push('admin', 'errors');
      }
      licenses() {
          return new APIList(this).push('admin', 'licenses');
      }
      license(id) {
          return new APIAdminResourceLicense(this, id);
      }
      marketShares() {
          return new APIList(this).push('admin', 'market-shares');
      }
      notificationPlans() {
          return new APIAdminListNotificationPlans(this);
      }
      notificationPlan(id) {
          return new APIAdminResourceNotificationPlan(this, id);
      }
      roles() {
          return new APIList(this).push('admin', 'roles');
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
          return new APIList(this).push('admin', 'services');
      }
      service(id) {
          return new APIAdminResourceService(this, id);
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
      preferences() {
          return new APIResource(this).push('preferences');
      }
  }

  if (global.isNodeJs) {
      axios.defaults.headers.common['User-Agent'] = `Bitbar Cloud API Client for JavaScript v${version}`;
  }
  axios.defaults.maxContentLength = 1073741824;
  class API {
      constructor(config) {
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
          this.axiosConfig.withCredentials = config.withCredentials == null ? false : config.withCredentials;
          this.axios = axios.create(this.axiosConfig);
      }
      userSession() {
          return new APIResourceUserSession(this);
      }
      user(id) {
          return new APIResourceUser(this, id);
      }
      users() {
          return new APIListUsers(this);
      }
      account(id) {
          return new APIResourceAccount(this, id);
      }
      me() {
          return this.user('me');
      }
      admin() {
          return new APIAdminResource(this);
      }
      devices() {
          return new APIListDevices(this);
      }
      device(id) {
          return new APIResourceDevice(this, id);
      }
      deviceGroups() {
          return new APIList(this).push('device-groups');
      }
      deviceGroup(id) {
          return new APIResourceDeviceGroup(this, id);
      }
      labelGroups() {
          return new APIList(this).push('label-groups');
      }
      deviceStatistics() {
          return new APIList(this).push('device-statistics');
      }
  }

  const CloudAPIClient = {
      API,
      FilterBuilder
  };

  return CloudAPIClient;

})));
//# sourceMappingURL=bitbar-cloud-api-client.js.map

/* Testdroid Cloud API Client for JavaScript v0.4.1-beta | (c) Marek Sierociński and other contributors | https://github.com/marverix/testdroid-api-client-js/blob/master/LICENSE.md */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global['testdroid-api-client-js'] = factory());
}(this, (function () { 'use strict';

  var Utils, buildParams;

  Utils = {};


  /*
    Serialize an array of form elements or a set of key/values into a query string

    Based on jQuery.param from jQuery v3.3.1

    jQuery JavaScript Library v3.3.1
    https://jquery.com/
   
    Copyright JS Foundation and other contributors
    Released under the MIT license
    https://jquery.org/license
   */

  buildParams = function(prefix, obj, add) {
    var i, j, k, len, v;
    if (Array.isArray(obj)) {
      for (i in obj) {
        v = obj[i];
        if (/\[\]$/.test(prefix)) {
          add(prefix, v);
        } else {
          buildParams(prefix + '[' + ((v != null) && typeof v === 'object' ? i : '') + ']', v, add);
        }
      }
    } else if ((obj != null) && typeof obj === 'object') {
      for (v = j = 0, len = obj.length; j < len; v = ++j) {
        k = obj[v];
        buildParams(prefix + '[' + k + ']', v, add);
      }
    } else {
      add(prefix, obj);
    }
  };

  Utils.param = function(a) {
    var add, item, j, k, len, s, v;
    s = [];
    add = function(key, valueOrFunction) {
      var value;
      value = typeof valueOrFunction === 'function' ? valueOrFunction() : valueOrFunction;
      return s[s.length] = encodeURIComponent(key) + '=' + encodeURIComponent(value != null ? value : '');
    };
    if (Array.isArray(a)) {
      for (j = 0, len = a.length; j < len; j++) {
        item = a[j];
        add(item.name, item.value);
      }
    } else {
      for (k in a) {
        v = a[k];
        buildParams(k, v, add);
      }
    }
    return s.join('&');
  };

  Utils.getUrl = function(resource, settings, cloudUrl) {
    var params, paramsString;
    if (settings == null) {
      settings = {};
    }
    if (cloudUrl == null) {
      cloudUrl = '';
    }
    params = Utils.extend({}, settings.params || {});
    delete params.important;
    delete params.cacheTTL;
    paramsString = Utils.param(params).replace('%25', '');
    if (paramsString.length > 0) {
      paramsString = '?' + paramsString;
    }
    return cloudUrl + resource + paramsString;
  };

  Utils.extend = function() {
    var i, j, key, ref;
    for (i = j = 1, ref = arguments.length - 1; 1 <= ref ? j <= ref : j >= ref; i = 1 <= ref ? ++j : --j) {
      for (key in arguments[i]) {
        if (arguments[i].hasOwnProperty(key)) {
          if (typeof arguments[0][key] === 'object' && typeof arguments[i][key] === 'object') {
            Utils.extend(arguments[0][key], arguments[i][key]);
          } else {
            arguments[0][key] = arguments[i][key];
          }
        }
      }
    }
    return arguments[0];
  };

  Utils.isJSONString = function(msg) {
    if (typeof msg !== 'string') {
      return false;
    }
    try {
      JSON.parse(msg);
    } catch (error) {
      return false;
    }
    return true;
  };

  Utils.isNaturalNumber = function(num) {
    return typeof num === 'number' && num >= 0 && !isNaN(num) && isFinite(num);
  };

  var Utils$1 = Utils;

  var ALLOWED_HTTP_METHODS, APIEntity, qs,
    slice = [].slice,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  qs = require('qs');

  ALLOWED_HTTP_METHODS = ['GET', 'POST', 'DELETE'];

  APIEntity = (function() {
    APIEntity.prototype._stack = null;

    APIEntity.prototype._config = null;

    APIEntity.prototype.root = null;

    function APIEntity(parent) {
      this._stack = [];
      this._config = {};
      if (parent.root === true) {
        this.root = parent;
      } else {
        this.root = parent.root;
      }
      if (parent._stack != null) {
        this.push.apply(this, parent._stack);
      }
      if (parent._config != null) {
        this.config(parent._config);
      }
    }

    APIEntity.prototype.push = function() {
      var i, item, items, len;
      items = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      for (i = 0, len = items.length; i < len; i++) {
        item = items[i];
        this._stack.push(item);
      }
      return this;
    };

    APIEntity.prototype.config = function(config) {
      Utils$1.extend(this._config, config);
      return this;
    };

    APIEntity.prototype.removeConfig = function(key) {
      delete this._config[key];
      return this;
    };

    APIEntity.prototype.method = function(name) {
      if (indexOf.call(ALLOWED_HTTP_METHODS, name) < 0) {
        throw new Error("Method '" + name + "' is not allowed! You can use: " + (ALLOWED_HTTP_METHODS.join(', ')));
      }
      return this.config({
        method: name
      });
    };

    APIEntity.prototype.get = function() {
      return this.method('GET');
    };

    APIEntity.prototype.post = function() {
      return this.method('POST');
    };

    APIEntity.prototype.params = function(params) {
      Utils$1.extend(this._config, {
        params: params
      });
      return this;
    };

    APIEntity.prototype.removeParam = function(key) {
      delete this._config.params[key];
      return this;
    };

    APIEntity.prototype.data = function(data) {
      Utils$1.extend(this._config, {
        data: data
      });
      return this;
    };

    APIEntity.prototype.send = function() {
      var base, config;
      config = Utils$1.extend({}, this._config, {
        url: '/' + this._stack.join('/')
      });
      if (config.headers == null) {
        config.headers = {};
      }
      if ((base = config.headers)['Content-Type'] == null) {
        base['Content-Type'] = 'application/x-www-form-urlencoded';
      }
      if (config.method === 'POST' && config.headers['Content-Type'] === 'application/x-www-form-urlencoded' && (config.data != null)) {
        config.data = qs.stringify(config.data);
      }
      return this.root.axios.request(config);
    };

    return APIEntity;

  })();

  var APIEntity$1 = APIEntity;

  var FilterBuilder;

  FilterBuilder = (function() {
    function FilterBuilder() {
      this.filters = [];
    }

    FilterBuilder.prototype._checkType = function(subject) {
      if (typeof subject === 'boolean') {
        return 'b';
      } else if (/^[0-9]{13}$/.test(subject)) {
        return 'd';
      } else if (/^[0-9]+(?:\.[0-9]+)?$/.test(subject)) {
        return 'n';
      } else {
        return 's';
      }
    };

    FilterBuilder.prototype._add = function(name, value, operand, type, checkNull) {
      var i, isNull, j, k, l, len, len1, len2, v;
      if (checkNull == null) {
        checkNull = false;
      }
      if (!Array.isArray(value)) {
        value = [value];
      }
      if (value.length === 0) {
        return this;
      }
      for (i = j = 0, len = value.length; j < len; i = ++j) {
        v = value[i];
        if (typeof v === 'object' && v instanceof Date) {
          value[i] = v.getTime();
        }
      }
      if (type == null) {
        for (k = 0, len1 = value.length; k < len1; k++) {
          v = value[k];
          if (v === null) {
            continue;
          }
          type = this._checkType(v);
          break;
        }
        if (operand === 'in' || operand === 'notin') {
          type = 'l' + type;
        }
      }
      isNull = false;
      if (checkNull) {
        for (l = 0, len2 = value.length; l < len2; l++) {
          v = value[l];
          if (v !== null) {
            continue;
          }
          isNull = true;
        }
        if (isNull) {
          value = value.filter(function(item) {
            return item !== null;
          });
          operand += 'ornull';
        }
      }
      this.filters.push({
        name: name,
        value: value,
        operand: operand,
        type: type
      });
      return this;
    };

    FilterBuilder.prototype.gt = function(name, value) {
      return this._add(name, value, 'gt', 'n');
    };

    FilterBuilder.prototype.lt = function(name, value) {
      return this._add(name, value, 'lt', 'n');
    };

    FilterBuilder.prototype.after = function(name, value) {
      return this._add(name, value, 'after', 'd', true);
    };

    FilterBuilder.prototype.before = function(name, value) {
      return this._add(name, value, 'before', 'd', true);
    };

    FilterBuilder.prototype.on = function(name, value) {
      return this._add(name, value, 'on', 'd');
    };

    FilterBuilder.prototype.eq = function(name, value) {
      return this._add(name, value, 'eq', void 0);
    };

    FilterBuilder.prototype.contains = function(name, value) {
      return this._add(name, value, 'contains', 's');
    };

    FilterBuilder.prototype.isnull = function(name, type) {
      return this._add(name, void 0, 'isnull', type);
    };

    FilterBuilder.prototype["in"] = function(name, value) {
      return this._add(name, value, 'in', void 0, true);
    };

    FilterBuilder.prototype.notin = function(name, value) {
      return this._add(name, value, 'notin', void 0, true);
    };

    FilterBuilder.prototype.raw = function(filter) {
      var f, j, len;
      if (Array.isArray(filter)) {
        for (j = 0, len = filter.length; j < len; j++) {
          f = filter[j];
          this.filters.push(f);
        }
      } else {
        this.filters.push(filter);
      }
    };

    FilterBuilder.prototype.ifFilterPart = function(str) {
      return /^l?[ndsb]_[a-zA-Z]{1}_[a-z]{2,12}/.test(str);
    };

    FilterBuilder.prototype.toString = function() {
      var filter, j, len, part, parts, ref, val;
      parts = [];
      ref = this.filters;
      for (j = 0, len = ref.length; j < len; j++) {
        filter = ref[j];
        if (typeof filter === 'string') {
          part = filter;
        } else {
          val = '';
          if (filter.value.length > 1 || typeof filter.value[0] !== 'undefined') {
            val = '_' + filter.value.join('|');
          }
          part = filter.type + '_' + filter.name + '_' + filter.operand + val;
        }
        parts.push(part);
      }
      return parts.join(';');
    };

    return FilterBuilder;

  })();

  var FilterBuilder$1 = FilterBuilder;

  var APIList, DEFAULT_LIMIT, DEFAULT_OFFSET,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  DEFAULT_LIMIT = 20;

  DEFAULT_OFFSET = 0;

  APIList = (function(superClass) {
    extend(APIList, superClass);

    function APIList() {
      return APIList.__super__.constructor.apply(this, arguments);
    }

    APIList.prototype.create = function() {
      return this.post();
    };

    APIList.prototype.sort = function(name, order) {
      if (order == null) {
        order = 'a';
      }
      if (order !== 'a' && order !== 'd') {
        throw new Error("Order '" + order + "' is invalid! Use 'a' for ascending or 'd' for descending.");
      }
      return this.params({
        sort: name + "_" + order
      });
    };

    APIList.prototype.limit = function(limit) {
      if (limit == null) {
        limit = DEFAULT_LIMIT;
      }
      if (!Utils$1.isNaturalNumber(limit)) {
        throw new Error("Limit '" + limit + "' is invalid!");
      }
      return this.params({
        limit: limit
      });
    };

    APIList.prototype.noLimit = function() {
      return this.params({
        limit: 0
      });
    };

    APIList.prototype.all = function() {
      return this.noLimit();
    };

    APIList.prototype.offset = function(offset) {
      if (offset == null) {
        offset = DEFAULT_OFFSET;
      }
      if (!Utils$1.isNaturalNumber(offset)) {
        throw new Error("Offset '" + offset + "' is invalid!");
      }
      return this.params({
        offset: offset
      });
    };

    APIList.prototype.between = function(from, to) {
      if (!Utils$1.isNaturalNumber(from)) {
        throw new Error("From '" + from + "' is invalid!");
      }
      if (!Utils$1.isNaturalNumber(to)) {
        throw new Error("To '" + to + "' is invalid!");
      }
      return this.params({
        offset: from,
        limit: 1 + (to - from)
      });
    };

    APIList.prototype.cut = function(from, to) {
      return this.between(from, to);
    };

    APIList.prototype.only = function(idx) {
      if (!Utils$1.isNaturalNumber(idx)) {
        throw new Error("Index '" + from + "' is invalid!");
      }
      return this.params({
        offset: idx,
        limit: 1
      });
    };

    APIList.prototype.page = function(page) {
      var limit, offset, ref;
      if (page == null) {
        page = 1;
      }
      if (!Utils$1.isNaturalNumber(page) || page === 0) {
        throw new Error("Page '" + from + "' is invalid!");
      }
      limit = ((ref = this._config.params) != null ? ref.limit : void 0) != null ? this._config.params.limit : DEFAULT_LIMIT;
      offset = (page - 1) * limit;
      return this.params({
        offset: offset,
        limit: limit
      });
    };

    APIList.prototype.search = function(query) {
      if (typeof query !== 'string') {
        throw new Error("Search query must be a string!");
      }
      return this.params({
        search: query
      });
    };

    APIList.prototype.filter = function(filter) {
      var isFilterBuilder;
      isFilterBuilder = filter instanceof FilterBuilder$1;
      if (typeof filter !== 'string' && !isFilterBuilder) {
        throw new Error("Filter must be a string or instance of FilterBuilder!");
      }
      if (isFilterBuilder) {
        filter = filter.toString();
      }
      return this.params({
        filter: filter
      });
    };

    return APIList;

  })(APIEntity$1);

  var APIList$1 = APIList;

  var APIResource$1,
    extend$1 = function(child, parent) { for (var key in parent) { if (hasProp$1.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp$1 = {}.hasOwnProperty;

  APIResource$1 = (function(superClass) {
    extend$1(APIResource, superClass);

    function APIResource() {
      return APIResource.__super__.constructor.apply(this, arguments);
    }

    APIResource.prototype.update = function() {
      return this.post();
    };

    APIResource.prototype["delete"] = function() {
      return this.method('DELETE');
    };

    return APIResource;

  })(APIEntity$1);

  var APIResource$2 = APIResource$1;

  var APIListDevices,
    extend$2 = function(child, parent) { for (var key in parent) { if (hasProp$2.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp$2 = {}.hasOwnProperty;

  APIListDevices = (function(superClass) {
    extend$2(APIListDevices, superClass);

    function APIListDevices(parent) {
      APIListDevices.__super__.constructor.call(this, parent);
      this.push('devices');
    }

    APIListDevices.prototype.filters = function() {
      return new APIResource$2(this).push('filters');
    };

    APIListDevices.prototype.cleanupConfigurations = function() {
      return new APIList$1(this).push('cleanup-configurations');
    };

    APIListDevices.prototype.cleanupConfiguration = function(id) {
      if (id == null) {
        throw new Error('Resource ID cannot be null!');
      }
      return new APIResource$2(this).push('cleanup-configurations', id);
    };

    return APIListDevices;

  })(APIList$1);

  var APIListDevices$1 = APIListDevices;

  var APIListProperties,
    extend$3 = function(child, parent) { for (var key in parent) { if (hasProp$3.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp$3 = {}.hasOwnProperty;

  APIListProperties = (function(superClass) {
    extend$3(APIListProperties, superClass);

    function APIListProperties(parent) {
      APIListProperties.__super__.constructor.call(this, parent);
      this.push('properties');
    }

    APIListProperties.prototype.appBan = function(id) {
      if (id == null) {
        throw new Error('Resource ID cannot be null!');
      }
      return this.push('app-bans').params({
        testRunId: id
      });
    };

    return APIListProperties;

  })(APIList$1);

  var APIListProperties$1 = APIListProperties;

  var APIListPurchased,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend$4 = function(child, parent) { for (var key in parent) { if (hasProp$4.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp$4 = {}.hasOwnProperty;

  APIListPurchased = (function(superClass) {
    extend$4(APIListPurchased, superClass);

    function APIListPurchased(parent) {
      this.active = bind(this.active, this);
      APIListPurchased.__super__.constructor.call(this, parent);
      this.push('purchased');
    }

    APIListPurchased.prototype.active = function() {
      return this.addHook(function(data) {
        var i, results;
        i = 0;
        results = [];
        while (i < data.length) {
          if (data[i].active) {
            results.push(i++);
          } else {
            results.push(data.splice(i, 1));
          }
        }
        return results;
      });
    };

    return APIListPurchased;

  })(APIList$1);

  var APIListPurchased$1 = APIListPurchased;

  var APIListServices,
    extend$5 = function(child, parent) { for (var key in parent) { if (hasProp$5.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp$5 = {}.hasOwnProperty;

  APIListServices = (function(superClass) {
    extend$5(APIListServices, superClass);

    function APIListServices(parent) {
      APIListServices.__super__.constructor.call(this, parent);
      this.push('services');
    }

    APIListServices.prototype.purchased = function() {
      return new APIListPurchased$1(this);
    };

    APIListServices.prototype.available = function() {
      return this.push('available');
    };

    APIListServices.prototype.active = function() {
      var now;
      if (this._stack[0] === 'me') {
        return this.push('active');
      } else {
        now = Date.now();
        return this.filter("d_activateTime_before_" + now + ";d_archiveTime_afterornull_" + now).sort('name', 'a').all();
      }
    };

    APIListServices.prototype.activated = function() {
      var now;
      now = Date.now();
      return this.filter("d_startTime_before_" + now + ";d_endTime_afterornull_" + now).sort('name', 'a').all();
    };

    return APIListServices;

  })(APIList$1);

  var APIListServices$1 = APIListServices;

  var APIResourceDevice,
    extend$6 = function(child, parent) { for (var key in parent) { if (hasProp$6.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp$6 = {}.hasOwnProperty;

  APIResourceDevice = (function(superClass) {
    extend$6(APIResourceDevice, superClass);

    function APIResourceDevice(parent, id) {
      if (id == null) {
        throw new Error('Resource ID cannot be null!');
      }
      APIResourceDevice.__super__.constructor.call(this, parent);
      this.push('devices', id);
    }

    APIResourceDevice.prototype.properties = function() {
      return new APIList$1(this).push('properties');
    };

    return APIResourceDevice;

  })(APIResource$2);

  var APIResourceDevice$1 = APIResourceDevice;

  var APIResourceDeviceGroup,
    extend$7 = function(child, parent) { for (var key in parent) { if (hasProp$7.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp$7 = {}.hasOwnProperty;

  APIResourceDeviceGroup = (function(superClass) {
    extend$7(APIResourceDeviceGroup, superClass);

    function APIResourceDeviceGroup(parent, id) {
      if (id == null) {
        throw new Error('Resource ID cannot be null!');
      }
      APIResourceDeviceGroup.__super__.constructor.call(this, parent);
      this.push('device-groups', id);
    }

    APIResourceDeviceGroup.prototype.devices = function() {
      return new APIList$1(this).push('devices');
    };

    APIResourceDeviceGroup.prototype.device = function(id) {
      if (id == null) {
        throw new Error('Resource ID cannot be null!');
      }
      return new APIResource$2(this).push('devices', id);
    };

    APIResourceDeviceGroup.prototype.selectors = function() {
      return new APIList$1(this).push('selectors');
    };

    APIResourceDeviceGroup.prototype.selector = function(id) {
      if (id == null) {
        throw new Error('Resource ID cannot be null!');
      }
      return new APIResource$2(this).push('selectors', id);
    };

    return APIResourceDeviceGroup;

  })(APIResource$2);

  var APIResourceDeviceGroup$1 = APIResourceDeviceGroup;

  var APIResourceDeviceSession, InputFileset, NON_MEDIA_FILES_FILTER, OutputFileset,
    extend$8 = function(child, parent) { for (var key in parent) { if (hasProp$8.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp$8 = {}.hasOwnProperty;

  NON_MEDIA_FILES_FILTER = new FilterBuilder$1();

  NON_MEDIA_FILES_FILTER.eq('state', 'READY');

  NON_MEDIA_FILES_FILTER.notin('mimetype', ['image/png', 'image/jpg', 'image/jpeg', 'image/webp', 'image/gif', 'video/mp4', 'video/avi', 'video/webm', 'video/ogg', 'video/mpeg']);

  APIResourceDeviceSession = (function(superClass) {
    extend$8(APIResourceDeviceSession, superClass);

    function APIResourceDeviceSession(parent, id) {
      if (id == null) {
        throw new Error('Resource ID cannot be null!');
      }
      APIResourceDeviceSession.__super__.constructor.call(this, parent);
      this.push('device-sessions', id);
    }

    APIResourceDeviceSession.prototype.clusterLogs = function() {
      return new APIResource$2(this).push('cluster-logs');
    };

    APIResourceDeviceSession.prototype.dataAvailability = function() {
      return new APIResource$2(this).push('data-availability');
    };

    APIResourceDeviceSession.prototype.fixturesZip = function() {
      return new APIResource$2(this).push('fixtures.zip');
    };

    APIResourceDeviceSession.prototype.junitXml = function() {
      return new APIResource$2(this).push('junit.xml');
    };

    APIResourceDeviceSession.prototype.logs = function() {
      return new APIResource$2(this).push('logs');
    };

    APIResourceDeviceSession.prototype.performance = function() {
      return new APIResource$2(this).push('performance');
    };

    APIResourceDeviceSession.prototype.release = function() {
      return new APIResource$2(this).push('release');
    };

    APIResourceDeviceSession.prototype.resultDataZip = function() {
      return new APIResource$2(this).push('result-data.zip');
    };

    APIResourceDeviceSession.prototype.screenshots = function() {
      return new APIList$1(this).push('screenshots');
    };

    APIResourceDeviceSession.prototype.screenshot = function(id) {
      if (id == null) {
        throw new Error('Resource ID cannot be null!');
      }
      return new APIResource$2(this).push('screenshots', id);
    };

    APIResourceDeviceSession.prototype.steps = function() {
      return new APIList$1(this).push('steps');
    };

    APIResourceDeviceSession.prototype.step = function(id) {
      if (id == null) {
        throw new Error('Resource ID cannot be null!');
      }
      return new APIResource$2(this).push('steps', id);
    };

    APIResourceDeviceSession.prototype.currentStep = function() {
      return this.step('current');
    };

    APIResourceDeviceSession.prototype.testCaseRuns = function() {
      return new APIList$1(this).push('test-case-runs');
    };

    APIResourceDeviceSession.prototype.retry = function() {
      return new APIResource$2(this).push('retry').post();
    };

    APIResourceDeviceSession.prototype.input = function() {
      return new InputFileset(this);
    };

    APIResourceDeviceSession.prototype.output = function() {
      return new OutputFileset(this);
    };

    APIResourceDeviceSession.prototype.videos = function() {
      return this.output().videos();
    };

    return APIResourceDeviceSession;

  })(APIResource$2);

  InputFileset = (function(superClass) {
    extend$8(InputFileset, superClass);

    function InputFileset(parent) {
      InputFileset.__super__.constructor.call(this, parent);
      this.push('input-file-set');
    }

    InputFileset.prototype.files = function() {
      return new APIList$1(this).push('files');
    };

    InputFileset.prototype.filesZip = function() {
      return new APIResource$2(this).push('files.zip');
    };

    return InputFileset;

  })(APIResource$2);

  OutputFileset = (function(superClass) {
    extend$8(OutputFileset, superClass);

    function OutputFileset(parent) {
      OutputFileset.__super__.constructor.call(this, parent);
      this.push('output-file-set');
    }

    OutputFileset.prototype.files = function() {
      return new APIList$1(this).push('files');
    };

    OutputFileset.prototype.filesZip = function() {
      return new APIResource$2(this).push('files.zip');
    };

    OutputFileset.prototype.screenshots = function() {
      return new APIList$1(this).push('screenshots');
    };

    OutputFileset.prototype.screenshot = function(id) {
      if (id == null) {
        throw new Error('Resource ID cannot be null!');
      }
      return new APIResource$2(this).push('screenshots', id);
    };

    OutputFileset.prototype.screenshotFile = function(id) {
      return this.screenshot(id).push('file');
    };

    OutputFileset.prototype.videos = function() {
      return this.files().params({
        filter: 's_state_eq_READY',
        tag: ['video']
      });
    };

    OutputFileset.prototype.nonMediaFiles = function() {
      return this.files().filter(NON_MEDIA_FILES_FILTER);
    };

    return OutputFileset;

  })(APIResource$2);

  var APIResourceDeviceSession$1 = APIResourceDeviceSession;

  var APIResourceFile,
    extend$9 = function(child, parent) { for (var key in parent) { if (hasProp$9.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp$9 = {}.hasOwnProperty;

  APIResourceFile = (function(superClass) {
    extend$9(APIResourceFile, superClass);

    function APIResourceFile(parent, id) {
      if (id == null) {
        throw new Error('Resource ID cannot be null!');
      }
      APIResourceFile.__super__.constructor.call(this, parent);
      this.push('files', id);
    }

    APIResourceFile.prototype.file = function() {
      return new APIResource$2(this).push('file');
    };

    APIResourceFile.prototype.icon = function() {
      return new APIResource$2(this).push('icon');
    };

    APIResourceFile.prototype.tags = function() {
      return new APIList$1(this).push('tags');
    };

    return APIResourceFile;

  })(APIResource$2);

  var APIResourceFile$1 = APIResourceFile;

  var APIResourceFileSet,
    extend$10 = function(child, parent) { for (var key in parent) { if (hasProp$10.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp$10 = {}.hasOwnProperty;

  APIResourceFileSet = (function(superClass) {
    extend$10(APIResourceFileSet, superClass);

    function APIResourceFileSet(parent, id) {
      if (id == null) {
        throw new Error('Resource ID cannot be null!');
      }
      APIResourceFileSet.__super__.constructor.call(this, parent);
      this.push('file-sets', id);
    }

    APIResourceFileSet.prototype.files = function() {
      return new APIList$1(this).push('files');
    };

    APIResourceFileSet.prototype.file = function(id) {
      return new APIResourceFile$1(this, id);
    };

    return APIResourceFileSet;

  })(APIResource$2);

  var APIResourceFileSet$1 = APIResourceFileSet;

  var APIResourceLabelGroup,
    extend$11 = function(child, parent) { for (var key in parent) { if (hasProp$11.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp$11 = {}.hasOwnProperty;

  APIResourceLabelGroup = (function(superClass) {
    extend$11(APIResourceLabelGroup, superClass);

    function APIResourceLabelGroup(parent, id) {
      if (id == null) {
        throw new Error('Resource ID cannot be null!');
      }
      APIResourceLabelGroup.__super__.constructor.call(this, parent);
      this.push('label-groups', id);
    }

    APIResourceLabelGroup.prototype.labels = function() {
      return new APIList$1(this).push('labels');
    };

    APIResourceLabelGroup.prototype.label = function(id) {
      return new APIResource$2(this).push('labels', id);
    };

    return APIResourceLabelGroup;

  })(APIResource$2);

  var APIResourceLabelGroup$1 = APIResourceLabelGroup;

  var APIResourceRun,
    extend$12 = function(child, parent) { for (var key in parent) { if (hasProp$12.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp$12 = {}.hasOwnProperty;

  APIResourceRun = (function(superClass) {
    extend$12(APIResourceRun, superClass);

    function APIResourceRun(parent, id) {
      if (id == null) {
        throw new Error('Resource ID cannot be null!');
      }
      APIResourceRun.__super__.constructor.call(this, parent);
      this.push('runs', id);
    }

    APIResourceRun.prototype.config = function() {
      return new APIResource$2(this).push('config');
    };

    APIResourceRun.prototype.deviceSessions = function() {
      return new APIList$1(this).push('device-sessions');
    };

    APIResourceRun.prototype.deviceSession = function(id) {
      return new APIResourceDeviceSession$1(this, id);
    };

    APIResourceRun.prototype.steps = function() {
      return new APIList$1(this).push('steps');
    };

    APIResourceRun.prototype.files = function() {
      return new APIList$1(this).push('files');
    };

    APIResourceRun.prototype.filesZip = function() {
      return new APIResource$2(this).push('files.zip');
    };

    APIResourceRun.prototype.tags = function() {
      return new APIList$1(this).push('tags');
    };

    APIResourceRun.prototype.tag = function(id) {
      if (id == null) {
        throw new Error('Resource ID cannot be null!');
      }
      return new APIResource$2(this).push('tags', id);
    };

    return APIResourceRun;

  })(APIResource$2);

  var APIResourceRun$1 = APIResourceRun;

  var APIResourceProject,
    extend$13 = function(child, parent) { for (var key in parent) { if (hasProp$13.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp$13 = {}.hasOwnProperty;

  APIResourceProject = (function(superClass) {
    extend$13(APIResourceProject, superClass);

    function APIResourceProject(parent, id) {
      if (id == null) {
        throw new Error('Resource ID cannot be null!');
      }
      APIResourceProject.__super__.constructor.call(this, parent);
      this.push('projects', id);
    }

    APIResourceProject.prototype.runs = function() {
      return new APIList$1(this).push('runs');
    };

    APIResourceProject.prototype.run = function(id) {
      return new APIResourceRun$1(this, id);
    };

    APIResourceProject.prototype.runsExtended = function() {
      return new APIList$1(this).push('runs-extended');
    };

    APIResourceProject.prototype.runExtended = function(id) {
      if (id == null) {
        throw new Error('Resource ID cannot be null!');
      }
      return new APIResource$2(this).push('runs-extended', id);
    };

    APIResourceProject.prototype.files = function() {
      return new APIList$1(this).push('files');
    };

    APIResourceProject.prototype.filesZip = function() {
      return new APIResource$2(this).push('files.zip');
    };

    APIResourceProject.prototype.sharings = function() {
      return new APIList$1(this).push('sharings');
    };

    APIResourceProject.prototype.sharing = function(id) {
      if (id == null) {
        throw new Error('Resource ID cannot be null!');
      }
      return new APIResource$2(this).push('sharings', id);
    };

    return APIResourceProject;

  })(APIResource$2);

  var APIResourceProject$1 = APIResourceProject;

  var APIResourceBillingPeriod,
    extend$14 = function(child, parent) { for (var key in parent) { if (hasProp$14.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp$14 = {}.hasOwnProperty;

  APIResourceBillingPeriod = (function(superClass) {
    extend$14(APIResourceBillingPeriod, superClass);

    function APIResourceBillingPeriod(parent, id) {
      if (id == null) {
        throw new Error('Resource ID cannot be null!');
      }
      APIResourceBillingPeriod.__super__.constructor.call(this, parent);
      this.push('billing-periods', id);
    }

    APIResourceBillingPeriod.prototype.receipt = function() {
      return new APIResource$2(this).push('receipt');
    };

    return APIResourceBillingPeriod;

  })(APIResource$2);

  var APIResourceBillingPeriod$1 = APIResourceBillingPeriod;

  var APIResourceBuild,
    extend$15 = function(child, parent) { for (var key in parent) { if (hasProp$15.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp$15 = {}.hasOwnProperty;

  APIResourceBuild = (function(superClass) {
    extend$15(APIResourceBuild, superClass);

    function APIResourceBuild(parent, id) {
      if (id == null) {
        throw new Error('Resource ID cannot be null!');
      }
      APIResourceBuild.__super__.constructor.call(this, parent);
      this.push('builds', id);
    }

    APIResourceBuild.prototype.abort = function() {
      return new APIResource$2(this).push('abort');
    };

    APIResourceBuild.prototype.outputFiles = function() {
      return new APIList$1(this).push('output-file-set', 'files');
    };

    return APIResourceBuild;

  })(APIResource$2);

  var APIResourceBuild$1 = APIResourceBuild;

  var APIResourceJob,
    extend$16 = function(child, parent) { for (var key in parent) { if (hasProp$16.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp$16 = {}.hasOwnProperty;

  APIResourceJob = (function(superClass) {
    extend$16(APIResourceJob, superClass);

    function APIResourceJob(parent, id) {
      if (id == null) {
        throw new Error('Resource ID cannot be null!');
      }
      APIResourceJob.__super__.constructor.call(this, parent);
      this.push('jobs', id);
    }

    APIResourceJob.prototype.builds = function() {
      return new APIList$1(this).push('builds');
    };

    APIResourceJob.prototype.build = function(id) {
      return new APIResourceBuild$1(this, id);
    };

    return APIResourceJob;

  })(APIResource$2);

  var APIResourceJob$1 = APIResourceJob;

  var APIResourceManualSession,
    extend$17 = function(child, parent) { for (var key in parent) { if (hasProp$17.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp$17 = {}.hasOwnProperty;

  APIResourceManualSession = (function(superClass) {
    extend$17(APIResourceManualSession, superClass);

    function APIResourceManualSession() {
      return APIResourceManualSession.__super__.constructor.apply(this, arguments);
    }

    APIResourceManualSession.prototype.connections = function() {
      var a;
      a = new APIResource(this);
      return a.push('connections');
    };

    return APIResourceManualSession;

  })(APIResourceDeviceSession$1);

  var APIResourceManualSession$1 = APIResourceManualSession;

  var APIResourceNotification,
    extend$18 = function(child, parent) { for (var key in parent) { if (hasProp$18.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp$18 = {}.hasOwnProperty;

  APIResourceNotification = (function(superClass) {
    extend$18(APIResourceNotification, superClass);

    function APIResourceNotification(parent, id) {
      if (id == null) {
        throw new Error('Resource ID cannot be null!');
      }
      APIResourceNotification.__super__.constructor.call(this, parent);
      this.push('notifications', id);
    }

    APIResourceNotification.prototype.test = function() {
      return new APIResource$2(this).push('test');
    };

    return APIResourceNotification;

  })(APIResource$2);

  var APIResourceNotification$1 = APIResourceNotification;

  var APIListDeviceTime,
    extend$19 = function(child, parent) { for (var key in parent) { if (hasProp$19.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp$19 = {}.hasOwnProperty;

  APIListDeviceTime = (function(superClass) {
    extend$19(APIListDeviceTime, superClass);

    function APIListDeviceTime(parent) {
      APIListDeviceTime.__super__.constructor.call(this, parent);
      this.push('device-time');
    }

    APIListDeviceTime.prototype.reserved = function() {
      return new APIList$1(this).push('reserved');
    };

    APIListDeviceTime.prototype.used = function() {
      return new APIList$1(this).push('used');
    };

    return APIListDeviceTime;

  })(APIList$1);

  var APIListDeviceTime$1 = APIListDeviceTime;

  var APIListRuns,
    extend$20 = function(child, parent) { for (var key in parent) { if (hasProp$20.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp$20 = {}.hasOwnProperty;

  APIListRuns = (function(superClass) {
    extend$20(APIListRuns, superClass);

    function APIListRuns(parent) {
      APIListRuns.__super__.constructor.call(this, parent);
      this.push('runs');
    }

    APIListRuns.prototype.config = function() {
      return new APIResource$2(this).push('config');
    };

    return APIListRuns;

  })(APIList$1);

  var APIListRuns$1 = APIListRuns;

  var APIListNotifications,
    extend$21 = function(child, parent) { for (var key in parent) { if (hasProp$21.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp$21 = {}.hasOwnProperty;

  APIListNotifications = (function(superClass) {
    extend$21(APIListNotifications, superClass);

    function APIListNotifications(parent) {
      APIListNotifications.__super__.constructor.call(this, parent);
      this.push('notifications');
    }

    APIListNotifications.prototype.scopes = function() {
      return new APIList$1(this).push('scopes');
    };

    APIListNotifications.prototype.channels = function() {
      return new APIList$1(this).push('channels');
    };

    return APIListNotifications;

  })(APIList$1);

  var APIListNotifications$1 = APIListNotifications;

  var APIResourceUser,
    extend$22 = function(child, parent) { for (var key in parent) { if (hasProp$22.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp$22 = {}.hasOwnProperty;

  APIResourceUser = (function(superClass) {
    extend$22(APIResourceUser, superClass);

    function APIResourceUser(parent, id) {
      if (id == null) {
        throw new Error('Resource ID cannot be null!');
      }
      APIResourceUser.__super__.constructor.call(this, parent);
      if (id === 'me') {
        this.push('me');
      } else {
        this.push('users', id);
      }
    }

    APIResourceUser.prototype.deviceTime = function() {
      return new APIListDeviceTime$1(this);
    };

    APIResourceUser.prototype.services = function() {
      return new APIListServices$1(this);
    };

    APIResourceUser.prototype.service = function(id) {
      if (id == null) {
        throw new Error('Resource ID cannot be null!');
      }
      return new APIResource$2(this).push('services', id);
    };

    APIResourceUser.prototype.accountServiceBillingPeriod = function(id) {
      if (id == null) {
        throw new Error('Resource ID cannot be null!');
      }
      return new APIResource$2(this).push('account-services', id, 'billing-period');
    };

    APIResourceUser.prototype.billingPeriods = function() {
      return new APIList$1(this).push('billing-periods');
    };

    APIResourceUser.prototype.billingPeriod = function(id) {
      return new APIResourceBillingPeriod$1(this, id);
    };

    APIResourceUser.prototype.jobs = function() {
      return new APIList$1(this).push('jobs');
    };

    APIResourceUser.prototype.job = function(id) {
      return new APIResourceJob$1(this, id);
    };

    APIResourceUser.prototype.deviceGroups = function() {
      return new APIList$1(this).push('device-groups');
    };

    APIResourceUser.prototype.deviceGroup = function(id) {
      return new APIResourceDeviceGroup$1(this, id);
    };

    APIResourceUser.prototype.deviceSessions = function() {
      return new APIList$1(this).push('device-sessions');
    };

    APIResourceUser.prototype.deviceSession = function(id) {
      return new APIResourceDeviceSession$1(this, id);
    };

    APIResourceUser.prototype.manualSession = function(id) {
      return new APIResourceManualSession$1(this, id);
    };

    APIResourceUser.prototype.projects = function() {
      return new APIList$1(this).push('projects');
    };

    APIResourceUser.prototype.project = function(id) {
      return new APIResourceProject$1(this, id);
    };

    APIResourceUser.prototype.fileSets = function() {
      return new APIList$1(this).push('file-sets');
    };

    APIResourceUser.prototype.fileSet = function(id) {
      return new APIResourceFileSet$1(this, id);
    };

    APIResourceUser.prototype.files = function() {
      return new APIList$1(this).push('files');
    };

    APIResourceUser.prototype.file = function(id) {
      return new APIResourceFile$1(this, id);
    };

    APIResourceUser.prototype.runs = function() {
      return new APIListRuns$1(this);
    };

    APIResourceUser.prototype.availableBuildExecutors = function() {
      return new APIList$1(this).push('available-build-executors');
    };

    APIResourceUser.prototype.availableFrameworks = function() {
      return new APIList$1(this).push('available-frameworks');
    };

    APIResourceUser.prototype.resetApiKey = function() {
      return new APIResource$2(this).push('reset-api-key');
    };

    APIResourceUser.prototype.restore = function() {
      return new APIResource$2(this).push('restore');
    };

    APIResourceUser.prototype.accountAdditionalUsers = function() {
      return new APIList$1(this).push('account', 'additional-users');
    };

    APIResourceUser.prototype.accountAdditionalUser = function(id) {
      if (id == null) {
        throw new Error('Resource ID cannot be null!');
      }
      return new APIResource$2(this).push('account', 'additional-users', id);
    };

    APIResourceUser.prototype.feedback = function() {
      return new APIResource$2(this).push('feedback');
    };

    APIResourceUser.prototype.notifications = function() {
      return new APIListNotifications$1(this);
    };

    APIResourceUser.prototype.notification = function(id) {
      return new APIResourceNotification$1(this, id);
    };

    APIResourceUser.prototype.receipts = function() {
      return new APIList$1(this).push('receipts');
    };

    APIResourceUser.prototype.uiPreferences = function() {
      return new APIResource$2(this).push('ui-preferences');
    };

    APIResourceUser.prototype.integrations = function() {
      return new APIList$1(this).push('integrations');
    };

    APIResourceUser.prototype.integration = function(id) {
      if (id == null) {
        throw new Error('Resource ID cannot be null!');
      }
      return new APIResource$2(this).push('integrations', id);
    };

    APIResourceUser.prototype.deviceUsage = function() {
      return new APIList$1(this).push('device-usage');
    };

    APIResourceUser.prototype.statistics = function() {
      return new APIList$1(this).push('statistics');
    };

    return APIResourceUser;

  })(APIResource$2);

  var APIResourceUser$1 = APIResourceUser;

  var APIResourceUserSession,
    extend$23 = function(child, parent) { for (var key in parent) { if (hasProp$23.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp$23 = {}.hasOwnProperty;

  APIResourceUserSession = (function(superClass) {
    extend$23(APIResourceUserSession, superClass);

    function APIResourceUserSession(parent) {
      APIResourceUserSession.__super__.constructor.call(this, parent);
      this.push('user-sessions');
    }

    APIResourceUserSession.prototype.login = function() {
      return new APIResource$2(this).push('login');
    };

    APIResourceUserSession.prototype.logout = function() {
      return new APIResource$2(this).push('logout');
    };

    APIResourceUserSession.prototype.sso = function(name) {
      return new APIResource$2(this).push('user-sessions', name + '-login');
    };

    return APIResourceUserSession;

  })(APIResource$2);

  var APIResourceUserSession$1 = APIResourceUserSession;

  var version = "0.4.1-beta";

  var API, axios;

  axios = require('axios');

  axios.defaults.headers.common['User-Agent'] = 'testdroid-api-client-js/' + version;

  API = (function() {
    API.prototype.root = true;

    API.prototype.config = null;

    API.prototype.axios = null;

    function API(config) {
      if (config == null) {
        throw new Error('config cannot be empty!');
      }
      this.config = {};
      if (config.cloudUrl != null) {
        if (typeof config.cloudUrl === 'string' && config.cloudUrl.length > 1) {
          this.config.baseURL = config.cloudUrl.replace(/\/+$/, '') + '/api';
        } else {
          throw new Error('Invalid config.cloudUrl!');
        }
      } else {
        throw new Error('config.cloudUrl is required!');
      }
      if (config.v2) {
        this.config.baseURL += '/v2';
      }
      if (config.apiKey != null) {
        if (typeof config.apiKey === 'string' && /^[A-Za-z0-9]{32}$/.test(config.apiKey)) {
          this.config.auth = {
            username: config.apiKey,
            password: ''
          };
        } else {
          throw new Error('Invalid config.apiKey!');
        }
      }
      this.axios = axios.create(this.config);
    }

    API.prototype.me = function() {
      return new APIResourceUser$1(this, 'me');
    };

    API.prototype.user = function(id) {
      return new APIResourceUser$1(this, id);
    };

    API.prototype.admin = function() {
      return console.log('TODO');
    };

    API.prototype.userSession = function() {
      return new APIResourceUserSession$1(this);
    };

    API.prototype.devices = function() {
      return new APIListDevices$1(this);
    };

    API.prototype.device = function(id) {
      return new APIResourceDevice$1(this, id);
    };

    API.prototype.deviceGroups = function() {
      return new APIList$1(this).push('device-groups');
    };

    API.prototype.deviceGroup = function(id) {
      return new APIResourceDeviceGroup$1(this, id);
    };

    API.prototype.deviceStatuses = function() {
      return new APIList$1(this).push('device-status');
    };

    API.prototype.deviceStatus = function(id) {
      if (id == null) {
        throw new Error('Resource ID cannot be null!');
      }
      return new APIResource$2(this).push('device-status', id);
    };

    API.prototype.deviceSessions = function() {
      return new APIList$1(this).push('device-sessions');
    };

    API.prototype.deviceSession = function(id) {
      return new APIResourceDeviceSession$1(this, id);
    };

    API.prototype.files = function() {
      return new APIList$1(this).push('files');
    };

    API.prototype.file = function(id) {
      return new APIResourceFile$1(this, id);
    };

    API.prototype.filePath = function(id) {
      if (id == null) {
        throw new Error('Resource ID cannot be null!');
      }
      return this.file(id).push('file');
    };

    API.prototype.fileSets = function() {
      return new APIList$1(this).push('file-sets');
    };

    API.prototype.fileSet = function(id) {
      return new APIResourceFileSet$1(this, id);
    };

    API.prototype.runsConfig = function() {
      return new APIResource$2(this).push('runs', 'config');
    };

    API.prototype.runs = function() {
      return new APIList$1(this).push('runs');
    };

    API.prototype.run = function(id) {
      return new APIResourceRun$1(this, id);
    };

    API.prototype.projects = function() {
      return new APIList$1(this).push('projects');
    };

    API.prototype.project = function(id) {
      return new APIResourceProject$1(this, id);
    };

    API.prototype.labelGroups = function() {
      return new APIList$1(this).push('label-groups');
    };

    API.prototype.labelGroup = function(id) {
      return new APIResourceLabelGroup$1(this, id);
    };

    API.prototype.properties = function() {
      return new APIListProperties$1(this);
    };

    API.prototype.property = function(id) {
      if (id == null) {
        throw new Error('Resource ID cannot be null!');
      }
      return new APIResource$2(this).push('properties', id);
    };

    API.prototype.services = function() {
      return new APIListServices$1(this);
    };

    API.prototype.sessions = function() {
      return new APIList$1(this).push('sessions');
    };

    API.prototype.license = function() {
      return new APIResource$2(this).push('license');
    };

    return API;

  })();

  var API$1 = API;

  var TestdroidCloudAPIClient;

  TestdroidCloudAPIClient = {
    API: API$1,
    Utils: Utils$1,
    FilterBuilder: FilterBuilder$1
  };

  var TestdroidCloudAPIClient$1 = TestdroidCloudAPIClient;

  return TestdroidCloudAPIClient$1;

})));

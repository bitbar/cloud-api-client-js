/* Testdroid Cloud API Client for JavaScript v0.2.2-alpha | (c) Marek Sierociński and other contributors | https://github.com/marverix/testdroid-api-client-js/blob/master/LICENSE.md */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global['testdroid-api-client-js'] = factory());
}(this, (function () { 'use strict';

  var Utils, buildParams;

  Utils = {};


  /*
    Throw error if id is not set
   */

  Utils.throwUnlessId = function(id, name) {
    if (id == null) {
      throw new Error(name + ' id must be provided!');
    }
  };


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

  var Utils$1 = Utils;

  var APIAbstractResource,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  APIAbstractResource = (function(superClass) {
    extend(APIAbstractResource, superClass);

    APIAbstractResource.prototype.constantParams = null;

    APIAbstractResource.prototype._hooks = null;

    APIAbstractResource.prototype.cacheTTL = 0;

    function APIAbstractResource(api, parent, dataType) {
      this.api = api;
      this.dataType = dataType;
      this.executeHooks = bind(this.executeHooks, this);
      this.clearHooks = bind(this.clearHooks, this);
      this.addHook = bind(this.addHook, this);
      this.getAbsoluteResourcePath = bind(this.getAbsoluteResourcePath, this);
      if (parent != null) {
        this.pushSelector(parent.getSelector());
      }
      this.constantParams = {};
      this._hooks = [];
      return;
    }

    APIAbstractResource.prototype.pushSelector = function(selector, id) {
      var i, len, r, res;
      if (id != null) {
        selector += '#' + id;
      }
      res = selector.split(/\s+/g);
      for (i = 0, len = res.length; i < len; i++) {
        r = res[i];
        this.push(r);
      }
      return this;
    };

    APIAbstractResource.prototype.getSelector = function() {
      return this.join(' ');
    };

    APIAbstractResource.prototype.getResourcePath = function() {
      return '/' + this.join('/').replace(/#/g, '/');
    };

    APIAbstractResource.prototype.getAbsoluteResourcePath = function() {
      return this.api.config.cloudUrl + this.getResourcePath();
    };

    APIAbstractResource.prototype.getUrl = function(params) {
      if (params == null) {
        params = {};
      }
      return this.api.getUrl(this.getResourcePath(), {
        params: params
      });
    };

    APIAbstractResource.prototype.get = function(settings) {
      var promise;
      if ((this.dataType != null) && !((settings != null ? settings.dataType : void 0) != null)) {
        if (settings == null) {
          settings = {};
        }
        settings.dataType = this.dataType;
      }
      settings = Utils$1.extend({
        params: this.constantParams
      }, settings);
      settings.params.cacheTTL = this.cacheTTL;
      promise = this.api.request(this.getResourcePath(), 'GET', settings);
      promise.then(this.executeHooks);
      return promise;
    };

    APIAbstractResource.prototype.getCustom = function(params, _settings) {
      var settings;
      if (params == null) {
        params = {};
      }
      if (_settings == null) {
        _settings = {};
      }
      settings = {
        method: 'GET',
        params: Utils$1.extend({}, this.constantParams, params)
      };
      Utils$1.extend(settings, _settings);
      return this.api.customRequest(this.getResourcePath(), settings);
    };

    APIAbstractResource.prototype._post = function(settings) {
      return this.api.request(this.getResourcePath(), 'POST', settings);
    };

    APIAbstractResource.prototype.post = function(data, _settings) {
      var settings;
      if (_settings == null) {
        _settings = {};
      }
      settings = {
        data: data,
        params: this.constantParams
      };
      Utils$1.extend(settings, _settings);
      return this._post(settings);
    };

    APIAbstractResource.prototype.update = function(data) {
      return this.post(data);
    };

    APIAbstractResource.prototype["delete"] = function(settings) {
      return this.api.request(this.getResourcePath(), 'DELETE', settings);
    };

    APIAbstractResource.prototype.addHook = function(hook) {
      this._hooks.push(hook);
      return this;
    };

    APIAbstractResource.prototype.clearHooks = function() {
      this._hooks = [];
      return this;
    };

    APIAbstractResource.prototype.executeHooks = function(items) {
      var hook;
      while (this._hooks.length > 0) {
        hook = this._hooks.shift();
        hook(items);
      }
    };

    APIAbstractResource.prototype.downloadCustom = function(params, options, filename, ext, pleaseWait) {
      var _filename, dfd, self;
      if (filename == null) {
        filename = null;
      }
      if (ext == null) {
        ext = null;
      }
      if (pleaseWait == null) {
        pleaseWait = true;
      }
      dfd = this.getCustom(params, options);
      if (pleaseWait) {
        _filename = filename;
        if (_filename == null) {
          _filename = this.join('-').replace(/#/g, '-');
        }
        $.pleaseWork(dfd, 'Downloading ' + _filename);
      }
      self = this;
      requirejs(['helpers/DownloadData'], function(DownloadData) {
        return dfd.then(DownloadData.call(self, filename, ext));
      });
      return dfd;
    };

    APIAbstractResource.prototype.downloadBinary = function(filename, ext, pleaseWait) {
      if (filename == null) {
        filename = null;
      }
      if (ext == null) {
        ext = null;
      }
      if (pleaseWait == null) {
        pleaseWait = true;
      }
      return this.downloadCustom({}, {
        dataType: 'binary',
        processData: false
      }, filename, ext, pleaseWait);
    };

    APIAbstractResource.prototype.downloadText = function(params, filename, ext, pleaseWait) {
      if (params == null) {
        params = {};
      }
      if (filename == null) {
        filename = null;
      }
      if (ext == null) {
        ext = null;
      }
      if (pleaseWait == null) {
        pleaseWait = true;
      }
      return this.downloadCustom(params, {
        dataType: 'text',
        processData: false
      }, filename, ext, pleaseWait);
    };

    APIAbstractResource.prototype.setConstantParams = function(params) {
      Utils$1.extend(this.constantParams, params);
      return this;
    };

    return APIAbstractResource;

  })(Array);

  var APIAbstractResource$1 = APIAbstractResource;

  var APIResource,
    extend$1 = function(child, parent) { for (var key in parent) { if (hasProp$1.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp$1 = {}.hasOwnProperty;

  APIResource = (function(superClass) {
    extend$1(APIResource, superClass);

    function APIResource() {
      return APIResource.__super__.constructor.apply(this, arguments);
    }

    APIResource.prototype.update = function(data) {
      return this.post(data);
    };

    return APIResource;

  })(APIAbstractResource$1);

  var APIResource$1 = APIResource;

  var APIPageable,
    extend$2 = function(child, parent) { for (var key in parent) { if (hasProp$2.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp$2 = {}.hasOwnProperty;

  APIPageable = (function(superClass) {
    extend$2(APIPageable, superClass);

    function APIPageable() {
      return APIPageable.__super__.constructor.apply(this, arguments);
    }

    APIPageable.prototype.get = function(params, _settings) {
      var settings;
      if (params == null) {
        params = {};
      }
      if (_settings == null) {
        _settings = {};
      }
      settings = {
        params: Utils$1.extend({}, this.constantParams, params)
      };
      Utils$1.extend(settings, _settings);
      return APIPageable.__super__.get.call(this, settings);
    };

    APIPageable.prototype.create = function(data, params) {
      if (params == null) {
        params = {};
      }
      return this.post(data, params);
    };

    APIPageable.prototype["delete"] = function() {
      return throwError("Can't delete collections");
    };

    return APIPageable;

  })(APIAbstractResource$1);

  var APIPageable$1 = APIPageable;

  var Device,
    extend$3 = function(child, parent) { for (var key in parent) { if (hasProp$3.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp$3 = {}.hasOwnProperty;

  Device = (function(superClass) {
    extend$3(Device, superClass);

    function Device(api, parent, id) {
      Device.__super__.constructor.call(this, api, parent);
      Utils$1.throwUnlessId(id, 'Device');
      this.pushSelector('devices', id);
    }

    Device.prototype.queue = function() {
      var a;
      a = new APIPageable$1(this.api, this);
      return a.pushSelector('queue');
    };

    Device.prototype.property = function(id) {
      var a;
      Utils$1.throwUnlessId(id, 'Device Property');
      a = new APIResource$1(this.api, this);
      return a.pushSelector('properties', id);
    };

    Device.prototype.properties = function() {
      var a;
      a = new APIPageable$1(this.api, this);
      return a.pushSelector('properties');
    };

    Device.prototype.label = function(id) {
      var a;
      Utils$1.throwUnlessId(id, 'Device Label');
      a = new APIResource$1(this.api, this);
      return a.pushSelector('labels', id);
    };

    Device.prototype.labels = function() {
      var a;
      a = new APIPageable$1(this.api, this);
      return a.pushSelector('labels');
    };

    return Device;

  })(APIResource$1);

  var Device$1 = Device;

  var DeviceGroup,
    extend$4 = function(child, parent) { for (var key in parent) { if (hasProp$4.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp$4 = {}.hasOwnProperty;

  DeviceGroup = (function(superClass) {
    extend$4(DeviceGroup, superClass);

    function DeviceGroup(api, parent, id) {
      DeviceGroup.__super__.constructor.call(this, api, parent);
      Utils$1.throwUnlessId(id, 'DeviceGroup');
      this.pushSelector('device-groups', id);
    }

    DeviceGroup.prototype.devices = function() {
      var a;
      a = new APIPageable$1(this.api, this);
      return a.pushSelector('devices');
    };

    DeviceGroup.prototype.device = function(id) {
      return new Device$1(this.api, this, id);
    };

    DeviceGroup.prototype.selectors = function() {
      var a;
      a = new APIPageable$1(this.api, this);
      return a.pushSelector('selectors');
    };

    DeviceGroup.prototype.selector = function(id) {
      var a;
      Utils$1.throwUnlessId(id, 'DeviceGroup Selector');
      a = new APIResource$1(this.api, this);
      return a.pushSelector('selectors', id);
    };

    return DeviceGroup;

  })(APIResource$1);

  var DeviceGroup$1 = DeviceGroup;

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

  var DeviceSession, InputFileset, OutputFileset,
    extend$5 = function(child, parent) { for (var key in parent) { if (hasProp$5.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp$5 = {}.hasOwnProperty;

  DeviceSession = (function(superClass) {
    extend$5(DeviceSession, superClass);

    function DeviceSession(api, parent, id) {
      DeviceSession.__super__.constructor.call(this, api, parent);
      Utils$1.throwUnlessId(id, 'DeviceSession');
      this.pushSelector('device-sessions', id);
    }

    DeviceSession.prototype.steps = function() {
      var a;
      a = new APIPageable$1(this.api, this);
      return a.pushSelector('steps');
    };

    DeviceSession.prototype.abort = function() {
      var a;
      a = new APIResource$1(this.api, this);
      return a.pushSelector('abort');
    };

    DeviceSession.prototype.release = function() {
      var a;
      a = new APIResource$1(this.api, this);
      return a.pushSelector('release');
    };

    DeviceSession.prototype.connections = function() {
      var a;
      a = new APIResource$1(this.api, this);
      return a.pushSelector('connections');
    };

    DeviceSession.prototype.output = function() {
      return new OutputFileset(this.api, this);
    };

    DeviceSession.prototype.input = function() {
      return new InputFileset(this.api, this);
    };

    DeviceSession.prototype.changeBillable = function() {
      var a;
      a = new APIResource$1(this.api, this);
      return a.pushSelector('changebillable');
    };

    DeviceSession.prototype.retry = function() {
      var a;
      a = new APIResource$1(this.api, this);
      a.pushSelector('retry');
      return a._post({
        timeout: 0
      });
    };

    DeviceSession.prototype.logs = function() {
      var a;
      a = new APIResource$1(this.api, this, 'text');
      return a.pushSelector('logs');
    };

    DeviceSession.prototype.performance = function() {
      var a;
      a = new APIResource$1(this.api, this);
      a.cacheTTL = Date.ms.MINUTE;
      return a.pushSelector('performance');
    };

    DeviceSession.prototype.screenshots = function() {
      var a;
      a = new APIPageable$1(this.api, this);
      return a.pushSelector('screenshots');
    };

    DeviceSession.prototype.screenshot = function(id) {
      var a;
      Utils$1.throwUnlessId(id, 'DeviceSession Screenshot');
      a = new APIResource$1(this.api, this);
      return a.pushSelector('screenshots', id);
    };

    DeviceSession.prototype.videos = function() {
      return this.output().videos();
    };

    DeviceSession.prototype.testCaseRuns = function() {
      var a;
      a = new APIPageable$1(this.api, this);
      a.cacheTTL = Date.ms.MINUTE;
      return a.pushSelector('test-case-runs');
    };

    DeviceSession.prototype.dataAvailability = function() {
      var a;
      a = new APIResource$1(this.api, this);
      return a.pushSelector('data-availability');
    };

    DeviceSession.prototype.clusterLogs = function() {
      var a;
      a = new APIResource$1(this.api, this);
      return a.pushSelector('cluster-logs');
    };

    DeviceSession.prototype.resultDataZip = function() {
      var a;
      a = new APIResource$1(this.api, this);
      return a.pushSelector('result-data.zip');
    };

    return DeviceSession;

  })(APIResource$1);

  InputFileset = (function(superClass) {
    extend$5(InputFileset, superClass);

    function InputFileset(api, parent) {
      InputFileset.__super__.constructor.call(this, api, parent);
      this.pushSelector('input-file-set');
    }

    InputFileset.prototype.files = function() {
      var a;
      a = new APIPageable$1(this.api, this);
      return a.pushSelector('files');
    };

    return InputFileset;

  })(APIResource$1);

  OutputFileset = (function(superClass) {
    extend$5(OutputFileset, superClass);

    function OutputFileset(api, parent) {
      OutputFileset.__super__.constructor.call(this, api, parent);
      this.pushSelector('output-file-set');
    }

    OutputFileset.prototype.filesZip = function() {
      var a;
      a = new APIResource$1(this.api, this);
      return a.pushSelector('files.zip');
    };

    OutputFileset.prototype.files = function() {
      var a;
      a = new APIPageable$1(this.api, this);
      a.cacheTTL = Date.ms.MINUTE;
      return a.pushSelector('files');
    };

    OutputFileset.prototype.note = function(id) {
      var a;
      Utils$1.throwUnlessId(id, 'DeviceSession Note');
      a = new APIResource$1(this.api, this);
      return a.pushSelector('notes', id);
    };

    OutputFileset.prototype.notes = function() {
      var a;
      a = new APIPageable$1(this.api, this);
      return a.pushSelector('notes');
    };

    OutputFileset.prototype.noteFile = function(id) {
      return this.note(id).pushSelector('file');
    };

    OutputFileset.prototype.screenshot = function(id) {
      var a;
      a = new APIResource$1(this.api, this);
      return a.pushSelector('screenshots', id);
    };

    OutputFileset.prototype.screenshots = function() {
      var a;
      a = new APIPageable$1(this.api, this);
      return a.pushSelector('screenshots');
    };

    OutputFileset.prototype.videos = function() {
      return this.files().setConstantParams({
        filter: 's_state_eq_READY',
        tag: ['video']
      });
    };

    OutputFileset.prototype.nonMediaFiles = function() {
      if (this._nonMediaFilesFilter == null) {
        this._nonMediaFilesFilter = new FilterBuilder$1();
        this._nonMediaFilesFilter.eq('state', 'READY');
        this._nonMediaFilesFilter.notin('mimetype', ['image/png', 'image/jpg', 'image/jpeg', 'image/webp', 'image/gif', 'video/mp4', 'video/avi', 'video/webm', 'video/ogg', 'video/mpeg']);
      }
      return this.files().setConstantParams({
        filter: this._nonMediaFilesFilter.toString()
      });
    };

    OutputFileset.prototype.screenshotFile = function(id) {
      return this.screenshot(id).pushSelector('file');
    };

    return OutputFileset;

  })(APIResource$1);

  var DeviceSession$1 = DeviceSession;

  var File,
    extend$6 = function(child, parent) { for (var key in parent) { if (hasProp$6.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp$6 = {}.hasOwnProperty;

  File = (function(superClass) {
    extend$6(File, superClass);

    function File(api, parent, param) {
      File.__super__.constructor.call(this, api, parent);
      if (isNumeric(param)) {
        this.pushSelector('files', param);
      } else if (typeof param === 'string') {
        if (param === 'certificate') {
          this.pushSelector('certificate');
        } else {
          this.pushSelector('files', param);
        }
      } else {
        this.pushSelector('files');
      }
    }

    File.prototype.upload = function(data) {
      return this.post(data);
    };

    File.prototype.tags = function() {
      var a;
      a = new APIPageable$1(this.api, this);
      return a.pushSelector('tags');
    };

    File.prototype.file = function() {
      var a;
      a = new APIResource$1(this.api, this);
      return a.pushSelector('file');
    };

    File.prototype.icon = function() {
      var a;
      a = new APIPageable$1(this.api, this);
      return a.pushSelector('icon');
    };

    File.prototype.app = function() {
      var a;
      a = new APIPageable$1(this.api, this);
      return a.pushSelector('application');
    };

    File.prototype.data = function() {
      var a;
      a = new APIPageable$1(this.api, this);
      return a.pushSelector('data');
    };

    File.prototype.test = function() {
      var a;
      a = new APIPageable$1(this.api, this);
      return a.pushSelector('test');
    };

    return File;

  })(APIResource$1);

  var File$1 = File;

  var Run,
    extend$7 = function(child, parent) { for (var key in parent) { if (hasProp$7.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp$7 = {}.hasOwnProperty;

  Run = (function(superClass) {
    extend$7(Run, superClass);

    function Run(api, parent, id) {
      Run.__super__.constructor.call(this, api, parent);
      Utils$1.throwUnlessId(id, 'Run');
      this.pushSelector('runs', id);
    }

    Run.prototype.files = function() {
      var a;
      a = new APIPageable$1(this.api, this);
      return a.pushSelector('files');
    };

    Run.prototype.file = function(name) {
      return new File$1(this.api, this, name);
    };

    Run.prototype.tags = function() {
      var a;
      a = new APIPageable$1(this.api, this);
      return a.pushSelector('tags');
    };

    Run.prototype.tag = function(id) {
      var a;
      Utils$1.throwUnlessId(id, 'Run Tag');
      a = new APIResource$1(this.api, this);
      return a.pushSelector('tags', id);
    };

    Run.prototype.deviceSessions = function() {
      var a;
      a = new APIPageable$1(this.api, this);
      return a.pushSelector('device-sessions');
    };

    Run.prototype.deviceSession = function(id) {
      return new DeviceSession$1(this.api, this, id);
    };

    Run.prototype.changeBillable = function() {
      var a;
      a = new APIResource$1(this.api, this);
      return a.pushSelector('changebillable');
    };

    Run.prototype.changePriority = function() {
      var a;
      a = new APIResource$1(this.api, this);
      return a.pushSelector('changepriority');
    };

    Run.prototype.videoRecording = function(id) {
      var a;
      Utils$1.throwUnlessId(id, 'Run ScreenRecording');
      a = new APIResource$1(this.api, this);
      return a.pushSelector('video-recording', id);
    };

    Run.prototype.reports = function(type) {
      var a;
      a = new APIPageable$1(this.api, this, false);
      return a.pushSelector('reports', type);
    };

    Run.prototype.steps = function() {
      var a;
      a = new APIPageable$1(this.api, this);
      return a.pushSelector('steps');
    };

    Run.prototype.screenRecordings = function() {
      var a;
      a = new APIPageable$1(this.api, this);
      return a.pushSelector('screen-recordings');
    };

    Run.prototype.screenshotNames = function() {
      var a;
      a = new APIPageable$1(this.api, this);
      return a.pushSelector('screenshot-names');
    };

    Run.prototype.screenshots = function() {
      var a;
      a = new APIPageable$1(this.api, this);
      return a.pushSelector('screenshots');
    };

    Run.prototype.abort = function() {
      this.pushSelector('abort');
      return this._post();
    };

    Run.prototype.retry = function(ids) {
      var params;
      this.pushSelector('retry');
      params = {
        timeout: 0
      };
      if (ids != null) {
        params.params = {
          deviceRunIds: ids
        };
      }
      return this._post(params);
    };

    Run.prototype.buildLogs = function(ids) {
      var params;
      this.pushSelector('build-logs.zip');
      params = {};
      if (ids != null) {
        params.params = {
          deviceRunIds: ids
        };
      }
      return this._post(params);
    };

    Run.prototype.config = function() {
      var a;
      a = new APIResource$1(this.api, this);
      return a.pushSelector('config');
    };

    Run.prototype.appsDataZip = function() {
      var a;
      a = new APIPageable$1(this.api, this);
      return a.pushSelector('apps-data.zip');
    };

    Run.prototype.screenshotsZip = function() {
      var a;
      a = new APIPageable$1(this.api, this);
      return a.pushSelector('screenshots.zip');
    };

    Run.prototype.performanceZip = function() {
      var a;
      a = new APIPageable$1(this.api, this);
      return a.pushSelector('performance.zip');
    };

    Run.prototype.logsZip = function() {
      var a;
      a = new APIPageable$1(this.api, this);
      return a.pushSelector('logs.zip');
    };

    Run.prototype.filesZip = function() {
      var a;
      a = new APIPageable$1(this.api, this);
      return a.pushSelector('files.zip');
    };

    Run.prototype.buildLogsZip = function() {
      var a;
      a = new APIPageable$1(this.api, this);
      return a.pushSelector('build-logs.zip');
    };

    Run.prototype.zipDataAvailability = function() {
      var a;
      a = new APIPageable$1(this.api, this);
      return a.pushSelector('data-availability');
    };

    return Run;

  })(APIResource$1);

  var Run$1 = Run;

  var Project,
    extend$8 = function(child, parent) { for (var key in parent) { if (hasProp$8.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp$8 = {}.hasOwnProperty;

  Project = (function(superClass) {
    extend$8(Project, superClass);

    function Project(api, parent, id) {
      Project.__super__.constructor.call(this, api, parent);
      Utils$1.throwUnlessId(id, 'Project');
      this.pushSelector('projects', id);
    }

    Project.prototype.publicDeviceGroups = function() {
      var a;
      a = new APIResource$1(this.api, this);
      return a.pushSelector('public-device-groups');
    };

    Project.prototype.publicDeviceGroup = function(id) {
      var a;
      a = new DeviceGroup$1(this.api, this, id);
      a[a.length - 1] = 'public-device-groups';
      return a;
    };

    Project.prototype.deviceGroups = function() {
      var a;
      a = new APIPageable$1(this.api, this);
      return a.pushSelector('device-groups');
    };

    Project.prototype.deviceGroup = function(id) {
      return new DeviceGroup$1(this.api, this, id);
    };

    Project.prototype.config = function() {
      var a;
      a = new APIResource$1(this.api, this);
      return a.pushSelector('config');
    };

    Project.prototype.files = function() {
      var a;
      a = new APIPageable$1(this.api, this);
      return a.pushSelector('files');
    };

    Project.prototype.file = function(id) {
      return new File$1(this.api, this, id);
    };

    Project.prototype.filesZip = function() {
      var a;
      a = new APIPageable$1(this.api, this);
      return a.pushSelector('files.zip');
    };

    Project.prototype.icon = function() {
      var a;
      a = new APIResource$1(this.api, this);
      return a.pushSelector('icon');
    };

    Project.prototype.sharings = function() {
      var a;
      a = new APIPageable$1(this.api, this);
      return a.pushSelector('sharings');
    };

    Project.prototype.sharing = function(id) {
      var a;
      Utils$1.throwUnlessId(id, 'Project Sharing');
      a = new APIResource$1(this.api, this);
      return a.pushSelector('sharings', id);
    };

    Project.prototype.trends = function() {
      var a;
      a = new APIResource$1(this.api, this);
      return a.pushSelector('trends');
    };

    Project.prototype.runs = function() {
      var a;
      a = new APIPageable$1(this.api, this);
      return a.pushSelector('runs');
    };

    Project.prototype.run = function(id) {
      return new Run$1(this.api, this, id);
    };

    Project.prototype.runsExtended = function() {
      var a;
      a = new APIPageable$1(this.api, this);
      return a.pushSelector('runs-extended');
    };

    Project.prototype.runExtended = function(id) {
      var a;
      Utils$1.throwUnlessId(id, 'Project RunExtended');
      a = new APIResource$1(this.api, this);
      return a.pushSelector('runs-extended', id);
    };

    Project.prototype.reports = function(type) {
      var a;
      a = new APIPageable$1(this.api, this, false);
      return a.pushSelector('reports', type);
    };

    Project.prototype.configParameters = function() {
      var a;
      a = new APIPageable$1(this.api, this);
      return a.pushSelector('config/parameters');
    };

    Project.prototype.configParameter = function(id) {
      var a;
      Utils$1.throwUnlessId(id, 'Project ConfigParameter');
      a = new APIResource$1(this.api, this);
      return a.pushSelector('config/parameters', id);
    };

    Project.prototype.unarchive = function() {
      var a;
      a = new APIResource$1(this.api, this);
      return a.pushSelector('unarchive');
    };

    Project.prototype.frameworks = function() {
      var a;
      a = new APIPageable$1(this.api, this);
      return a.pushSelector('frameworks');
    };

    Project.prototype.availableFrameworks = function() {
      var a;
      a = new APIPageable$1(this.api, this);
      return a.pushSelector('available-frameworks');
    };

    return Project;

  })(APIResource$1);

  var Project$1 = Project;

  var FileSet,
    extend$9 = function(child, parent) { for (var key in parent) { if (hasProp$9.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp$9 = {}.hasOwnProperty;

  FileSet = (function(superClass) {
    extend$9(FileSet, superClass);

    function FileSet(api, parent, id) {
      FileSet.__super__.constructor.call(this, api, parent);
      Utils$1.throwUnlessId(id, 'FileSet');
      this.pushSelector('file-sets', id);
    }

    FileSet.prototype.files = function() {
      var a;
      a = new APIPageable$1(this.api, this);
      return a.pushSelector('files');
    };

    FileSet.prototype.file = function(id) {
      return new File$1(this.api, this, id);
    };

    return FileSet;

  })(APIResource$1);

  var FileSet$1 = FileSet;

  var BillingPeriod,
    extend$10 = function(child, parent) { for (var key in parent) { if (hasProp$10.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp$10 = {}.hasOwnProperty;

  BillingPeriod = (function(superClass) {
    extend$10(BillingPeriod, superClass);

    function BillingPeriod(api, parent, id) {
      BillingPeriod.__super__.constructor.call(this, api, parent);
      Utils$1.throwUnlessId(id, 'BillingPeriod');
      this.pushSelector('billing-periods', id);
    }

    BillingPeriod.prototype.receipt = function() {
      var a;
      a = new APIResource$1(this.api, this);
      return a.pushSelector('receipt');
    };

    return BillingPeriod;

  })(APIResource$1);

  var BillingPeriod$1 = BillingPeriod;

  var Purchased,
    bind$1 = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend$11 = function(child, parent) { for (var key in parent) { if (hasProp$11.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp$11 = {}.hasOwnProperty;

  Purchased = (function(superClass) {
    extend$11(Purchased, superClass);

    function Purchased(api, parent, id) {
      this.receipt = bind$1(this.receipt, this);
      Purchased.__super__.constructor.call(this, api, parent);
      Utils$1.throwUnlessId(id, 'Purchased');
      this.pushSelector('purchased', id);
    }

    Purchased.prototype.receipt = function() {
      var a;
      a = new APIPageable$1(this.api, this);
      return a.pushSelector('receipt');
    };

    return Purchased;

  })(APIResource$1);

  var Purchased$1 = Purchased;

  var PurchasedList,
    bind$2 = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend$12 = function(child, parent) { for (var key in parent) { if (hasProp$12.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp$12 = {}.hasOwnProperty;

  PurchasedList = (function(superClass) {
    extend$12(PurchasedList, superClass);

    function PurchasedList(api, parent) {
      this.active = bind$2(this.active, this);
      PurchasedList.__super__.constructor.call(this, api, parent);
      this.pushSelector('purchased');
    }

    PurchasedList.prototype.active = function() {
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

    return PurchasedList;

  })(APIPageable$1);

  var PurchasedList$1 = PurchasedList;

  var Services,
    extend$13 = function(child, parent) { for (var key in parent) { if (hasProp$13.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp$13 = {}.hasOwnProperty;

  Services = (function(superClass) {
    extend$13(Services, superClass);

    function Services(api, parent) {
      Services.__super__.constructor.call(this, api, parent);
      this.pushSelector('services');
    }

    Services.prototype.purchased = function(id) {
      if (id != null) {
        return new Purchased$1(this.api, this, id);
      } else {
        return new PurchasedList$1(this.api, this);
      }
    };

    Services.prototype.available = function() {
      return this.pushSelector('available');
    };

    Services.prototype.active = function() {
      if (this[0] === 'me') {
        return this.pushSelector('active');
      } else {
        return this.setConstantParams({
          sort: 'name_a',
          limit: 0,
          filter: 'd_activateTime_before_' + Date.now() + ';d_archiveTime_afterornull_' + Date.now()
        });
      }
    };

    Services.prototype.activated = function() {
      return this.setConstantParams({
        sort: 'name_a',
        limit: 0,
        filter: 'd_startTime_before_' + Date.now() + ';d_endTime_afterornull_' + Date.now()
      });
    };

    return Services;

  })(APIPageable$1);

  var Services$1 = Services;

  var Service,
    extend$14 = function(child, parent) { for (var key in parent) { if (hasProp$14.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp$14 = {}.hasOwnProperty;

  Service = (function(superClass) {
    extend$14(Service, superClass);

    function Service(api, parent, id) {
      Service.__super__.constructor.call(this, api, parent);
      Utils$1.throwUnlessId(id, 'Service');
      this.pushSelector('services', id);
    }

    Service.prototype.activate = function(data) {
      var a;
      a = new APIResource$1(this.api, this);
      a.pushSelector('activate');
      return a.post(data);
    };

    Service.prototype.deactivate = function() {
      var a;
      a = new APIResource$1(this.api, this);
      a.pushSelector('deactivate');
      return a.post();
    };

    Service.prototype.roles = function() {
      var a;
      a = new APIPageable$1(this.api, this);
      return a.pushSelector('roles');
    };

    return Service;

  })(APIResource$1);

  var Service$1 = Service;

  var Account,
    extend$15 = function(child, parent) { for (var key in parent) { if (hasProp$15.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp$15 = {}.hasOwnProperty;

  Account = (function(superClass) {
    extend$15(Account, superClass);

    function Account(api, parent) {
      Account.__super__.constructor.call(this, api, parent);
      this.pushSelector('account');
    }

    Account.prototype.services = function() {
      return new Services$1(this.api, this);
    };

    Account.prototype.service = function(id) {
      var a;
      Utils$1.throwUnlessId(id, 'Account Services');
      a = new APIResource$1(this.api, this);
      return a.pushSelector('services', id);
    };

    Account.prototype.roles = function() {
      var a;
      a = new APIPageable$1(this.api, this);
      return a.pushSelector('roles');
    };

    Account.prototype.role = function(id) {
      var a;
      Utils$1.throwUnlessId(id, 'Account Roles');
      a = new APIResource$1(this.api, this);
      return a.pushSelector('roles', id);
    };

    Account.prototype.additionalUsers = function() {
      var a;
      a = new APIPageable$1(this.api, this);
      return a.pushSelector('additional-users');
    };

    Account.prototype.additionalUser = function(id) {
      var a;
      Utils$1.throwUnlessId(id, 'Account Additional User');
      a = new APIResource$1(this.api, this);
      return a.pushSelector('additional-users', id);
    };

    return Account;

  })(APIPageable$1);

  var Account$1 = Account;

  var Notifications,
    extend$16 = function(child, parent) { for (var key in parent) { if (hasProp$16.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp$16 = {}.hasOwnProperty;

  Notifications = (function(superClass) {
    extend$16(Notifications, superClass);

    function Notifications(api, parent) {
      Notifications.__super__.constructor.call(this, api, parent);
      this.pushSelector('notifications');
      return;
    }

    Notifications.prototype.scopes = function() {
      var a;
      a = new APIPageable$1(this.api, this);
      return a.pushSelector('scopes');
    };

    Notifications.prototype.channels = function() {
      var a;
      a = new APIPageable$1(this.api, this);
      return a.pushSelector('channels');
    };

    return Notifications;

  })(APIPageable$1);

  var Notifications$1 = Notifications;

  var Notification,
    extend$17 = function(child, parent) { for (var key in parent) { if (hasProp$17.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp$17 = {}.hasOwnProperty;

  Notification = (function(superClass) {
    extend$17(Notification, superClass);

    function Notification(api, parent, id) {
      Notification.__super__.constructor.call(this, api, parent);
      Utils$1.throwUnlessId(id, 'Notification');
      this.pushSelector('notifications', id);
    }

    Notification.prototype.test = function() {
      var a;
      a = new APIResource$1(this.api, this);
      return a.pushSelector('test');
    };

    return Notification;

  })(APIResource$1);

  var Notification$1 = Notification;

  var Build,
    extend$18 = function(child, parent) { for (var key in parent) { if (hasProp$18.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp$18 = {}.hasOwnProperty;

  Build = (function(superClass) {
    extend$18(Build, superClass);

    function Build(api, parent, id) {
      Build.__super__.constructor.call(this, api, parent);
      Utils$1.throwUnlessId(id, 'Build');
      this.pushSelector('builds', id);
    }

    Build.prototype.config = function() {
      var a;
      a = new APIResource$1(this.api, this);
      return a.pushSelector('config');
    };

    return Build;

  })(APIResource$1);

  var Build$1 = Build;

  var Job,
    extend$19 = function(child, parent) { for (var key in parent) { if (hasProp$19.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp$19 = {}.hasOwnProperty;

  Job = (function(superClass) {
    extend$19(Job, superClass);

    function Job(api, parent, id) {
      Job.__super__.constructor.call(this, api, parent);
      Utils$1.throwUnlessId(id, 'Job');
      this.pushSelector('jobs', id);
    }

    Job.prototype.config = function() {
      var a;
      a = new APIResource$1(this.api, this);
      return a.pushSelector('config');
    };

    Job.prototype.build = function(id) {
      return new Build$1(this.api, this, id);
    };

    Job.prototype.builds = function() {
      var a;
      a = new APIPageable$1(this.api, this);
      return a.pushSelector('builds');
    };

    return Job;

  })(APIResource$1);

  var Job$1 = Job;

  var User,
    extend$20 = function(child, parent) { for (var key in parent) { if (hasProp$20.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp$20 = {}.hasOwnProperty;

  User = (function(superClass) {
    extend$20(User, superClass);

    function User(api, parent, id) {
      User.__super__.constructor.call(this, api, parent);
      Utils$1.throwUnlessId(id, 'User');
      if (id === 'me') {
        this.pushSelector('me');
      } else {
        this.pushSelector('users', id);
      }
    }

    User.prototype.deviceGroups = function() {
      var a;
      a = new APIPageable$1(this.api, this);
      return a.pushSelector('device-groups');
    };

    User.prototype.deviceGroup = function(id) {
      return new DeviceGroup$1(this.api, this, id);
    };

    User.prototype.deviceSessions = function() {
      var a;
      a = new APIPageable$1(this.api, this);
      return a.pushSelector('device-sessions');
    };

    User.prototype.deviceUsage = function() {
      var a;
      a = new APIPageable$1(this.api, this);
      return a.pushSelector('device-usage');
    };

    User.prototype.deviceSession = function(id) {
      return new DeviceSession$1(this.api, this, id);
    };

    User.prototype.projects = function() {
      var a;
      a = new APIPageable$1(this.api, this);
      return a.pushSelector('projects');
    };

    User.prototype.project = function(id) {
      return new Project$1(this.api, this, id);
    };

    User.prototype.availableProjectTypes = function() {
      var a;
      a = new APIPageable$1(this.api, this);
      return a.pushSelector('available-project-types-extended');
    };

    User.prototype.filesets = function() {
      var a;
      a = new APIPageable$1(this.api, this);
      return a.pushSelector('file-sets');
    };

    User.prototype.fileset = function(id) {
      return new FileSet$1(this.api, this, id);
    };

    User.prototype.files = function() {
      var a;
      a = new APIPageable$1(this.api, this);
      return a.pushSelector('files');
    };

    User.prototype.file = function(id) {
      return new File$1(this.api, this, id);
    };

    User.prototype.billingPeriods = function() {
      var a;
      a = new APIPageable$1(this.api, this);
      return a.pushSelector('billing-periods');
    };

    User.prototype.billingPeriod = function(id) {
      return new BillingPeriod$1(this.api, this, id);
    };

    User.prototype.runsConfig = function() {
      var a;
      a = new APIResource$1(this.api, this);
      a.pushSelector('runs');
      return a.pushSelector('config');
    };

    User.prototype.runs = function() {
      var a;
      a = new APIPageable$1(this.api, this);
      return a.pushSelector('runs');
    };

    User.prototype.run = function(id) {
      return new Run$1(this, void 0, id);
    };

    User.prototype.services = function() {
      return new Services$1(this.api, this);
    };

    User.prototype.service = function(id) {
      return new Service$1(this.api, this, id);
    };

    User.prototype.filePath = function(id) {
      var a;
      a = new APIPageable$1(this.api, this);
      a.pushSelector('files', id);
      return a.pushSelector('file');
    };

    User.prototype.deviceTime = function() {
      var a;
      a = new APIPageable$1(this.api, this);
      return a.pushSelector('device-time');
    };

    User.prototype.uiPreferences = function() {
      var a;
      a = new APIPageable$1(this.api, this);
      return a.pushSelector('ui-preferences');
    };

    User.prototype.account = function() {
      return new Account$1(this.api, this);
    };

    User.prototype.receipts = function() {
      var a;
      a = new APIPageable$1(this.api, this);
      return a.pushSelector('receipts');
    };

    User.prototype.receipt = function(id) {
      var a;
      Utils$1.throwUnlessId(id, 'User Receipt');
      a = new APIResource$1(this.api, this);
      return a.pushSelector('receipts', id);
    };

    User.prototype.resetApiKey = function() {
      var a;
      a = new APIPageable$1(this.api, this);
      return a.pushSelector('reset-api-key');
    };

    User.prototype.integrations = function() {
      var a;
      a = new APIPageable$1(this.api, this);
      return a.pushSelector('integrations');
    };

    User.prototype.integration = function(id) {
      var a;
      a = new APIResource$1(this.api, this);
      return a.pushSelector('integrations', id);
    };

    User.prototype.notifications = function() {
      return new Notifications$1(this.api, this);
    };

    User.prototype.notification = function(id) {
      return new Notification$1(this.api, this, id);
    };

    User.prototype.statistics = function() {
      var a;
      a = new APIPageable$1(this.api, this);
      return a.pushSelector('statistics');
    };

    User.prototype.restore = function() {
      this.pushSelector('restore');
      return this._post();
    };

    User.prototype.jobs = function() {
      var a;
      a = new APIPageable$1(this.api, this);
      return a.pushSelector('jobs');
    };

    User.prototype.job = function(id) {
      return new Job$1(this.api, this, id);
    };

    return User;

  })(APIResource$1);

  var User$1 = User;

  var Devices,
    extend$21 = function(child, parent) { for (var key in parent) { if (hasProp$21.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp$21 = {}.hasOwnProperty;

  Devices = (function(superClass) {
    extend$21(Devices, superClass);

    function Devices(api, parent) {
      Devices.__super__.constructor.call(this, api, parent);
      this.pushSelector('devices');
    }

    Devices.prototype.filters = function() {
      var a;
      a = new APIResource$1(this.api, this);
      return a.pushSelector('filters');
    };

    Devices.prototype.cleanupConfigurations = function() {
      var a;
      a = new APIPageable$1(this.api, this);
      return a.pushSelector('cleanup-configurations');
    };

    Devices.prototype.cleanupConfiguration = function(id) {
      var a;
      Utils$1.throwUnlessId(id, 'Devices CleanupConfiguration');
      a = new APIResource$1(this.api, this);
      return a.pushSelector('cleanup-configurations', id);
    };

    return Devices;

  })(APIPageable$1);

  var Devices$1 = Devices;

  var Label,
    extend$22 = function(child, parent) { for (var key in parent) { if (hasProp$22.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp$22 = {}.hasOwnProperty;

  Label = (function(superClass) {
    extend$22(Label, superClass);

    function Label(api, parent, id) {
      Label.__super__.constructor.call(this, api, parent);
      Utils$1.throwUnlessId(id, 'Label');
      this.pushSelector('labels', id);
    }

    Label.prototype.devices = function() {
      var a;
      a = new APIPageable$1(this.api, this);
      return a.pushSelector('devices');
    };

    Label.prototype.device = function(id) {
      var a;
      Utils$1.throwUnlessId(id, 'Label Device');
      a = new APIResource$1(this.api, this);
      return a.pushSelector('devices', id);
    };

    return Label;

  })(APIResource$1);

  var Label$1 = Label;

  var LabelGroup,
    extend$23 = function(child, parent) { for (var key in parent) { if (hasProp$23.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp$23 = {}.hasOwnProperty;

  LabelGroup = (function(superClass) {
    extend$23(LabelGroup, superClass);

    function LabelGroup(api, parent, id) {
      LabelGroup.__super__.constructor.call(this, api, parent);
      Utils$1.throwUnlessId(id, 'LabelGroup');
      this.pushSelector('label-groups', id);
    }

    LabelGroup.prototype.labels = function() {
      var a;
      a = new APIPageable$1(this.api, this);
      return a.pushSelector('labels');
    };

    LabelGroup.prototype.label = function(id) {
      return new Label$1(this.api, this, id);
    };

    return LabelGroup;

  })(APIResource$1);

  var LabelGroup$1 = LabelGroup;

  var Properties,
    extend$24 = function(child, parent) { for (var key in parent) { if (hasProp$24.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp$24 = {}.hasOwnProperty;

  Properties = (function(superClass) {
    extend$24(Properties, superClass);

    function Properties(api, parent) {
      Properties.__super__.constructor.call(this, api, parent);
      this.pushSelector('properties');
    }

    Properties.prototype.appBan = function(id) {
      Utils$1.throwUnlessId(id, 'Property AppBan');
      this.pushSelector('app-bans');
      return this.setConstantParams({
        testRunId: id
      });
    };

    return Properties;

  })(APIPageable$1);

  var Properties$1 = Properties;

  var UserSession,
    extend$25 = function(child, parent) { for (var key in parent) { if (hasProp$25.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp$25 = {}.hasOwnProperty;

  UserSession = (function(superClass) {
    extend$25(UserSession, superClass);

    function UserSession() {
      return UserSession.__super__.constructor.apply(this, arguments);
    }

    UserSession.prototype.login = function() {
      var a;
      a = new APIPageable$1(this.api, this);
      return a.pushSelector('login');
    };

    UserSession.prototype.logout = function() {
      var a;
      a = new APIPageable$1(this.api, this);
      return a.pushSelector('logout');
    };

    return UserSession;

  })(APIResource$1);

  var UserSession$1 = UserSession;

  var TestdroidCloudAPIClient;

  TestdroidCloudAPIClient = (function() {
    function TestdroidCloudAPIClient(config) {
      this.config = {
        cloudUrl: null,
        driver: null
      };
      this.setup(config);
    }

    TestdroidCloudAPIClient.prototype.setup = function(config) {
      Utils$1.extend(this.config, config);
      if ((this.config.cloudUrl != null) && typeof this.config.cloudUrl === 'string' && this.config.cloudUrl.length > 1) {
        this.config.cloudUrl = this.config.cloudUrl.replace(/\/+$/, '');
      } else {
        throw 'Invalid cloudUrl';
      }
    };

    TestdroidCloudAPIClient.prototype.getUrl = function(resource, settings) {
      return Utils$1.getUrl.call(this, resource, settings, this.config.cloudUrl);
    };

    TestdroidCloudAPIClient.prototype.request = function(resource, method, settings, dfd) {
      var _settings, cacheId, cacheTTL, contentType, ref, req, storedData;
      if (settings == null) {
        settings = {};
      }
      if (dfd == null) {
        dfd = $.Deferred();
      }
      contentType = Utils$1.isJSONString(settings.data) ? 'application/json' : 'application/x-www-form-urlencoded; charset=UTF-8';
      _settings = {
        method: method,
        data: settings.data,
        dataType: settings.dataType,
        contentType: contentType,
        timeout: settings.timeout,
        params: settings.params
      };
      if ((typeof FormData !== "undefined" && FormData !== null) && _settings.data instanceof FormData) {
        _settings.contentType = false;
        _settings.processData = false;
      }
      _settings.dfd = dfd;
      _settings.xhr = this._xhrHandlerFactory(_settings);
      _settings.success = this._successHandlerFactory(resource, _settings);
      _settings.error = this._errorHandlerFactory(resource, _settings);
      if (_settings.method === 'GET' && ((ref = _settings.params) != null ? ref.cacheTTL : void 0) > 0) {
        cacheId = 'GET ' + app.ctx.service.ajax.getUrl(resource, _settings) + ' ' + _settings.contentType;
        cacheTTL = _settings.params.cacheTTL;
        if (Cache.isStored(cacheId)) {
          storedData = Cache.get(cacheId);
          if (isPromise(storedData)) {
            dfd = storedData;
          } else {
            dfd.resolve.apply(this, storedData);
          }
          return dfd;
        } else {
          Cache.set(cacheId, dfd, cacheTTL);
          (function(cacheId, cacheTTL) {
            dfd.then(function() {
              return Cache.set(cacheId, arguments, cacheTTL);
            });
            return dfd.fail(function() {
              return Cache.remove(cacheId);
            });
          })(cacheId, cacheTTL);
        }
      }
      req = app.ctx.service.ajax.request(resource, _settings);
      dfd.abort = req.abort;
      return dfd;
    };

    TestdroidCloudAPIClient.prototype.customRequest = function(resource, settings, dfd) {
      if (settings == null) {
        settings = {};
      }
      if (dfd == null) {
        dfd = $.Deferred();
      }
      if (settings.uploadProgress == null) {
        settings.uploadProgress = this._progressHandlerFactory(settings, dfd);
      }
      if (settings.success == null) {
        settings.success = (function(_this) {
          return function() {
            return dfd.resolve.apply(_this, arguments);
          };
        })(this);
      }
      if (settings.error == null) {
        settings.error = (function(_this) {
          return function() {
            return dfd.reject.apply(_this, arguments);
          };
        })(this);
      }
      settings.xhr = (function(_this) {
        return function() {
          var xhr;
          xhr = new window.XMLHttpRequest();
          if (settings.method === 'POST') {
            xhr.upload.addEventListener('progress', _this._progressHandlerFactory(settings, dfd));
          } else {
            xhr.addEventListener('progress', _this._progressHandlerFactory(settings, dfd));
          }
          return xhr;
        };
      })(this);
      app.ctx.service.ajax.request(resource, settings);
      return dfd;
    };

    TestdroidCloudAPIClient.prototype._xhrHandlerFactory = function(settings) {
      return (function(_this) {
        return function() {
          var xhr;
          xhr = new window.XMLHttpRequest();
          if (settings.method === 'POST') {
            xhr.upload.addEventListener('progress', _this._progressHandlerFactory(settings));
          } else {
            xhr.addEventListener('progress', _this._progressHandlerFactory(settings));
          }
          return xhr;
        };
      })(this);
    };

    TestdroidCloudAPIClient.prototype._progressHandlerFactory = function(settings) {
      return function(e) {
        return settings.dfd.notify({
          type: settings.method === 'POST' ? 'upload' : 'download',
          computable: e.lengthComputable,
          totalBytes: e.total,
          loadedBytes: e.loaded,
          loadedPercent: e.lengthComputable ? parseFloat(e.loaded / e.total * 100) : void 0
        });
      };
    };

    TestdroidCloudAPIClient.prototype._errorHandlerFactory = function(resource, settings) {
      return (function(_this) {
        return function(xhr, status) {
          if (arguments.length > 1) {
            if (xhr.status === 401) {
              app.ctx.service.auth.reAuthorize(function() {
                return _this.request(resource, settings.method, settings, settings.dfd);
              });
            } else if (xhr.status === 404) {
              settings.dfd.reject(xhr, status);
            } else {
              $console.warn(_this._getRequestLog(xhr, settings.method, resource));
              $console.warn('Request settings:', settings);
              settings.dfd.reject(xhr, status);
            }
          } else {
            $console.warn('Trying to re-authorize...');
            app.ctx.service.auth.reAuthorize(function() {
              return _this.request(resource, settings.method, settings, settings.dfd);
            });
          }
        };
      })(this);
    };

    TestdroidCloudAPIClient.prototype._successHandlerFactory = function(resource, settings) {
      return (function(_this) {
        return function(data, status, xhr) {
          var info;
          if (data instanceof XMLDocument) {
            return requirejs(['x2js'], function(X2JS) {
              var obj;
              if (_this._xml2json == null) {
                _this._xml2json = new X2JS();
              }
              obj = _this._xml2json.xml2json(data);
              obj = obj[Object.keys(obj)[0]];
              return settings.dfd.resolve(obj, {
                status: status,
                apiHandler: 'form'
              });
            });
          } else {
            info = {};
            info.status = status;
            info.apiHandler = 'json';
            if (settings.method === 'GET') {
              info.offset = data.offset;
              info.limit = data.limit;
              info.total = data.total;
              info.search = data.search;
              info.sort = data.sort;
              info.size = xhr.getResponseHeader('Content-Length');
              if (data.data && (data.total != null)) {
                data = data.data;
              }
            }
            return settings.dfd.resolve(data, info);
          }
        };
      })(this);
    };

    TestdroidCloudAPIClient.prototype._getRequestLog = function(xhr, method, resource) {
      return "HTTP " + method + " status " + xhr.status + " (" + xhr.statusText + ")\n Resource: " + resource + "\nResponse: " + xhr.responseText;
    };

    TestdroidCloudAPIClient.prototype.user = function(id) {
      return new User$1(this, null, id);
    };

    TestdroidCloudAPIClient.prototype.me = function() {
      return new User$1(this, void 0, 'me');
    };

    TestdroidCloudAPIClient.prototype.admin = function() {
      return new Admin(this);
    };

    TestdroidCloudAPIClient.prototype.devices = function() {
      return new Devices$1(this);
    };

    TestdroidCloudAPIClient.prototype.device = function(id) {
      return new Device$1(this, null, id);
    };

    TestdroidCloudAPIClient.prototype.files = function() {
      var a;
      a = new APIPageable$1(this);
      return a.pushSelector('files');
    };

    TestdroidCloudAPIClient.prototype.file = function(id) {
      return new File$1(this, null, id);
    };

    TestdroidCloudAPIClient.prototype.filesets = function() {
      var a;
      a = new APIPageable$1(this);
      return a.pushSelector('file-sets');
    };

    TestdroidCloudAPIClient.prototype.fileset = function(id) {
      return new FileSet$1(this, null, id);
    };

    TestdroidCloudAPIClient.prototype.runsConfig = function() {
      var a;
      a = new APIResource$1(this);
      a.pushSelector('runs');
      return a.pushSelector('config');
    };

    TestdroidCloudAPIClient.prototype.runs = function() {
      var a;
      a = new APIPageable$1(this);
      return a.pushSelector('runs');
    };

    TestdroidCloudAPIClient.prototype.run = function(id) {
      return new Run$1(this, null, id);
    };

    TestdroidCloudAPIClient.prototype.projects = function() {
      var a;
      a = new APIPageable$1(this);
      return a.pushSelector('projects');
    };

    TestdroidCloudAPIClient.prototype.project = function(id) {
      return new Project$1(this, null, id);
    };

    TestdroidCloudAPIClient.prototype.labelGroups = function() {
      var a;
      a = new APIPageable$1(this);
      return a.pushSelector('label-groups');
    };

    TestdroidCloudAPIClient.prototype.labelGroup = function(id) {
      return new LabelGroup$1(this, null, id);
    };

    TestdroidCloudAPIClient.prototype.deviceStatuses = function() {
      var a;
      a = new APIPageable$1(this);
      return a.pushSelector('device-status');
    };

    TestdroidCloudAPIClient.prototype.deviceStatus = function(id) {
      var a;
      Utils$1.throwUnlessId(id, 'Device Status');
      a = new APIResource$1(this);
      return a.pushSelector('device-status', id);
    };

    TestdroidCloudAPIClient.prototype.property = function(id) {
      var a;
      Utils$1.throwUnlessId(id, 'Properties');
      a = new APIResource$1(this, void 0);
      return a.pushSelector('properties', id);
    };

    TestdroidCloudAPIClient.prototype.properties = function() {
      return new Properties$1(this);
    };

    TestdroidCloudAPIClient.prototype.services = function() {
      return new Services$1(this);
    };

    TestdroidCloudAPIClient.prototype.filePath = function(id) {
      var a;
      Utils$1.throwUnlessId(id, 'Files Path');
      a = new APIPageable$1(this);
      a.pushSelector('files', id);
      return a.pushSelector('file');
    };

    TestdroidCloudAPIClient.prototype.deviceSessions = function() {
      var a;
      a = new APIPageable$1(this);
      return a.pushSelector('device-sessions');
    };

    TestdroidCloudAPIClient.prototype.deviceSession = function(id) {
      return new DeviceSession$1(this, null, id);
    };

    TestdroidCloudAPIClient.prototype.sessions = function() {
      var a;
      a = new APIPageable$1(this);
      return a.pushSelector('sessions');
    };

    TestdroidCloudAPIClient.prototype.deviceGroups = function() {
      var a;
      a = new APIPageable$1(this);
      return a.pushSelector('device-groups');
    };

    TestdroidCloudAPIClient.prototype.deviceGroup = function(id) {
      return new DeviceGroup$1(this, null, id);
    };

    TestdroidCloudAPIClient.prototype.userSessions = function() {
      var a;
      a = new APIPageable$1(this);
      return a.pushSelector('user-session');
    };

    TestdroidCloudAPIClient.prototype.userSession = function() {
      return new UserSession$1(this);
    };

    TestdroidCloudAPIClient.prototype.license = function() {
      var a;
      a = new APIResource$1(this);
      a.cacheTTL = Date.ms.HOUR;
      return a.pushSelector('license');
    };

    TestdroidCloudAPIClient.prototype.sso = function(name) {
      var a;
      a = new APIResource$1(this);
      a.pushSelector('user-sessions');
      a.pushSelector(name + '-login');
      return a.getAbsoluteResourcePath();
    };

    return TestdroidCloudAPIClient;

  })();

  var TestdroidCloudAPIClient$1 = TestdroidCloudAPIClient;

  TestdroidCloudAPIClient$1.Utils = Utils$1;

  TestdroidCloudAPIClient$1.FilterBuilder = FilterBuilder$1;

  return TestdroidCloudAPIClient$1;

})));

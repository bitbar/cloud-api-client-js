(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global['testdroid-js-api-client'] = factory());
}(this, (function () { 'use strict';

  var APIAbstractResource$1,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  APIAbstractResource$1 = (function(superClass) {
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
      return app.env.apiUrl + this.getResourcePath();
    };

    APIAbstractResource.prototype.getUrl = function(params) {
      if (params == null) {
        params = {};
      }
      return app.ctx.service.ajax.getUrl(this.getResourcePath(), {
        params: params
      });
    };

    APIAbstractResource.prototype.openUrl = function() {
      return window.open(this.getUrl(), '_blank');
    };

    APIAbstractResource.prototype.get = function(settings) {
      var promise, ref;
      if ((this.dataType != null) && !((settings != null ? settings.dataType : void 0) != null)) {
        if (settings == null) {
          settings = {};
        }
        settings.dataType = this.dataType;
      }
      promise = new $.Deferred();
      promise.then(this.executeHooks);
      settings = $.extend(true, {
        params: this.constantParams
      }, settings);
      settings.params.cacheTTL = this.cacheTTL;
      if (((ref = this.api) != null ? ref.request : void 0) != null) {
        return this.api.request(this.getResourcePath(), 'GET', settings, promise);
      } else {
        $console.error(new Error('API CALL IS NOT A FUNCTION!!!'));
        return false;
      }
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
        params: $.extend({}, this.constantParams, params)
      };
      $.extend(true, settings, _settings);
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
      $.extend(true, settings, _settings);
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
      $.extend(this.constantParams, params);
      return this;
    };

    return APIAbstractResource;

  })(Array);

  var APIResource$1,
    extend$1 = function(child, parent) { for (var key in parent) { if (hasProp$1.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp$1 = {}.hasOwnProperty;

  APIResource$1 = (function(superClass) {
    extend$1(APIResource, superClass);

    function APIResource() {
      return APIResource.__super__.constructor.apply(this, arguments);
    }

    APIResource.prototype.update = function(data) {
      return this.post(data);
    };

    return APIResource;

  })(APIAbstractResource);

  var APIPageable$1,
    extend$2 = function(child, parent) { for (var key in parent) { if (hasProp$2.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp$2 = {}.hasOwnProperty;

  APIPageable$1 = (function(superClass) {
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
        params: $.extend({}, this.constantParams, params)
      };
      $.extend(settings, _settings);
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

  })(APIAbstractResource);

  var throwUnlessId = function(id, name) {
    if (id == null) {
      throw new Error(name + ' id must be provided!');
    }
  };

  var Utils = {
  	throwUnlessId: throwUnlessId
  };

  var Device$1,
    extend$3 = function(child, parent) { for (var key in parent) { if (hasProp$3.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp$3 = {}.hasOwnProperty;

  Device$1 = (function(superClass) {
    extend$3(Device, superClass);

    function Device(api, parent, id) {
      Device.__super__.constructor.call(this, api, parent);
      Utils(id, 'Device');
      this.pushSelector('devices', id);
    }

    Device.prototype.queue = function() {
      var a;
      a = new APIPageable(this.api, this);
      return a.pushSelector('queue');
    };

    Device.prototype.property = function(id) {
      var a;
      Utils(id, 'Device Property');
      a = new APIResource(this.api, this);
      return a.pushSelector('properties', id);
    };

    Device.prototype.properties = function() {
      var a;
      a = new APIPageable(this.api, this);
      return a.pushSelector('properties');
    };

    Device.prototype.label = function(id) {
      var a;
      Utils(id, 'Device Label');
      a = new APIResource(this.api, this);
      return a.pushSelector('labels', id);
    };

    Device.prototype.labels = function() {
      var a;
      a = new APIPageable(this.api, this);
      return a.pushSelector('labels');
    };

    return Device;

  })(APIResource);

  var DeviceGroup$1,
    extend$4 = function(child, parent) { for (var key in parent) { if (hasProp$4.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp$4 = {}.hasOwnProperty;

  DeviceGroup$1 = (function(superClass) {
    extend$4(DeviceGroup, superClass);

    function DeviceGroup(api, parent, id) {
      DeviceGroup.__super__.constructor.call(this, api, parent);
      Utils(id, 'DeviceGroup');
      this.pushSelector('device-groups', id);
    }

    DeviceGroup.prototype.devices = function() {
      var a;
      a = new APIPageable(this.api, this);
      return a.pushSelector('devices');
    };

    DeviceGroup.prototype.device = function(id) {
      return new Device(this.api, this, id);
    };

    DeviceGroup.prototype.selectors = function() {
      var a;
      a = new APIPageable(this.api, this);
      return a.pushSelector('selectors');
    };

    DeviceGroup.prototype.selector = function(id) {
      var a;
      Utils(id, 'DeviceGroup Selector');
      a = new APIResource(this.api, this);
      return a.pushSelector('selectors', id);
    };

    return DeviceGroup;

  })(APIResource);

  var DeviceSession$1, InputFileset, OutputFileset,
    extend$5 = function(child, parent) { for (var key in parent) { if (hasProp$5.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp$5 = {}.hasOwnProperty;

  DeviceSession$1 = (function(superClass) {
    extend$5(DeviceSession, superClass);

    function DeviceSession(api, parent, id) {
      DeviceSession.__super__.constructor.call(this, api, parent);
      Utils(id, 'DeviceSession');
      this.pushSelector('device-sessions', id);
    }

    DeviceSession.prototype.steps = function() {
      var a;
      a = new APIPageable(this.api, this);
      return a.pushSelector('steps');
    };

    DeviceSession.prototype.abort = function() {
      var a;
      a = new APIResource(this.api, this);
      return a.pushSelector('abort');
    };

    DeviceSession.prototype.release = function() {
      var a;
      a = new APIResource(this.api, this);
      return a.pushSelector('release');
    };

    DeviceSession.prototype.connections = function() {
      var a;
      a = new APIResource(this.api, this);
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
      a = new APIResource(this.api, this);
      return a.pushSelector('changebillable');
    };

    DeviceSession.prototype.retry = function() {
      var a;
      a = new APIResource(this.api, this);
      a.pushSelector('retry');
      return a._post({
        timeout: 0
      });
    };

    DeviceSession.prototype.logs = function() {
      var a;
      a = new APIResource(this.api, this, 'text');
      return a.pushSelector('logs');
    };

    DeviceSession.prototype.performance = function() {
      var a;
      a = new APIResource(this.api, this);
      a.cacheTTL = Date.ms.MINUTE;
      return a.pushSelector('performance');
    };

    DeviceSession.prototype.screenshots = function() {
      var a;
      a = new APIPageable(this.api, this);
      return a.pushSelector('screenshots');
    };

    DeviceSession.prototype.screenshot = function(id) {
      var a;
      Utils(id, 'DeviceSession Screenshot');
      a = new APIResource(this.api, this);
      return a.pushSelector('screenshots', id);
    };

    DeviceSession.prototype.videos = function() {
      return this.output().videos();
    };

    DeviceSession.prototype.testCaseRuns = function() {
      var a;
      a = new APIPageable(this.api, this);
      a.cacheTTL = Date.ms.MINUTE;
      return a.pushSelector('test-case-runs');
    };

    DeviceSession.prototype.dataAvailability = function() {
      var a;
      a = new APIResource(this.api, this);
      return a.pushSelector('data-availability');
    };

    DeviceSession.prototype.clusterLogs = function() {
      var a;
      a = new APIResource(this.api, this);
      return a.pushSelector('cluster-logs');
    };

    DeviceSession.prototype.resultDataZip = function() {
      var a;
      a = new APIResource(this.api, this);
      return a.pushSelector('result-data.zip');
    };

    return DeviceSession;

  })(APIResource);

  InputFileset = (function(superClass) {
    extend$5(InputFileset, superClass);

    function InputFileset(api, parent) {
      InputFileset.__super__.constructor.call(this, api, parent);
      this.pushSelector('input-file-set');
    }

    InputFileset.prototype.files = function() {
      var a;
      a = new APIPageable(this.api, this);
      return a.pushSelector('files');
    };

    return InputFileset;

  })(APIResource);

  OutputFileset = (function(superClass) {
    extend$5(OutputFileset, superClass);

    function OutputFileset(api, parent) {
      OutputFileset.__super__.constructor.call(this, api, parent);
      this.pushSelector('output-file-set');
    }

    OutputFileset.prototype.filesZip = function() {
      var a;
      a = new APIResource(this.api, this);
      return a.pushSelector('files.zip');
    };

    OutputFileset.prototype.files = function() {
      var a;
      a = new APIPageable(this.api, this);
      a.cacheTTL = Date.ms.MINUTE;
      return a.pushSelector('files');
    };

    OutputFileset.prototype.note = function(id) {
      var a;
      Utils(id, 'DeviceSession Note');
      a = new APIResource(this.api, this);
      return a.pushSelector('notes', id);
    };

    OutputFileset.prototype.notes = function() {
      var a;
      a = new APIPageable(this.api, this);
      return a.pushSelector('notes');
    };

    OutputFileset.prototype.noteFile = function(id) {
      return this.note(id).pushSelector('file');
    };

    OutputFileset.prototype.screenshot = function(id) {
      var a;
      a = new APIResource(this.api, this);
      return a.pushSelector('screenshots', id);
    };

    OutputFileset.prototype.screenshots = function() {
      var a;
      a = new APIPageable(this.api, this);
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
        this._nonMediaFilesFilter = new FilterBuilder();
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

  })(APIResource);

  var File$1,
    extend$6 = function(child, parent) { for (var key in parent) { if (hasProp$6.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp$6 = {}.hasOwnProperty;

  File$1 = (function(superClass) {
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
      a = new APIPageable(this.api, this);
      return a.pushSelector('tags');
    };

    File.prototype.file = function() {
      var a;
      a = new APIResource(this.api, this);
      return a.pushSelector('file');
    };

    File.prototype.icon = function() {
      var a;
      a = new APIPageable(this.api, this);
      return a.pushSelector('icon');
    };

    File.prototype.app = function() {
      var a;
      a = new APIPageable(this.api, this);
      return a.pushSelector('application');
    };

    File.prototype.data = function() {
      var a;
      a = new APIPageable(this.api, this);
      return a.pushSelector('data');
    };

    File.prototype.test = function() {
      var a;
      a = new APIPageable(this.api, this);
      return a.pushSelector('test');
    };

    return File;

  })(APIResource);

  var Run$1,
    extend$7 = function(child, parent) { for (var key in parent) { if (hasProp$7.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp$7 = {}.hasOwnProperty;

  Run$1 = (function(superClass) {
    extend$7(Run, superClass);

    function Run(api, parent, id) {
      Run.__super__.constructor.call(this, api, parent);
      Utils(id, 'Run');
      this.pushSelector('runs', id);
    }

    Run.prototype.files = function() {
      var a;
      a = new APIPageable(this.api, this);
      return a.pushSelector('files');
    };

    Run.prototype.file = function(name) {
      return new File(this.api, this, name);
    };

    Run.prototype.tags = function() {
      var a;
      a = new APIPageable(this.api, this);
      return a.pushSelector('tags');
    };

    Run.prototype.tag = function(id) {
      var a;
      Utils(id, 'Run Tag');
      a = new APIResource(this.api, this);
      return a.pushSelector('tags', id);
    };

    Run.prototype.deviceSessions = function() {
      var a;
      a = new APIPageable(this.api, this);
      return a.pushSelector('device-sessions');
    };

    Run.prototype.deviceSession = function(id) {
      return new DeviceSession(this.api, this, id);
    };

    Run.prototype.changeBillable = function() {
      var a;
      a = new APIResource(this.api, this);
      return a.pushSelector('changebillable');
    };

    Run.prototype.changePriority = function() {
      var a;
      a = new APIResource(this.api, this);
      return a.pushSelector('changepriority');
    };

    Run.prototype.videoRecording = function(id) {
      var a;
      Utils(id, 'Run ScreenRecording');
      a = new APIResource(this.api, this);
      return a.pushSelector('video-recording', id);
    };

    Run.prototype.reports = function(type) {
      var a;
      a = new APIPageable(this.api, this, false);
      return a.pushSelector('reports', type);
    };

    Run.prototype.steps = function() {
      var a;
      a = new APIPageable(this.api, this);
      return a.pushSelector('steps');
    };

    Run.prototype.screenRecordings = function() {
      var a;
      a = new APIPageable(this.api, this);
      return a.pushSelector('screen-recordings');
    };

    Run.prototype.screenshotNames = function() {
      var a;
      a = new APIPageable(this.api, this);
      return a.pushSelector('screenshot-names');
    };

    Run.prototype.screenshots = function() {
      var a;
      a = new APIPageable(this.api, this);
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
      a = new APIResource(this.api, this);
      return a.pushSelector('config');
    };

    Run.prototype.appsDataZip = function() {
      var a;
      a = new APIPageable(this.api, this);
      return a.pushSelector('apps-data.zip');
    };

    Run.prototype.screenshotsZip = function() {
      var a;
      a = new APIPageable(this.api, this);
      return a.pushSelector('screenshots.zip');
    };

    Run.prototype.performanceZip = function() {
      var a;
      a = new APIPageable(this.api, this);
      return a.pushSelector('performance.zip');
    };

    Run.prototype.logsZip = function() {
      var a;
      a = new APIPageable(this.api, this);
      return a.pushSelector('logs.zip');
    };

    Run.prototype.filesZip = function() {
      var a;
      a = new APIPageable(this.api, this);
      return a.pushSelector('files.zip');
    };

    Run.prototype.buildLogsZip = function() {
      var a;
      a = new APIPageable(this.api, this);
      return a.pushSelector('build-logs.zip');
    };

    Run.prototype.zipDataAvailability = function() {
      var a;
      a = new APIPageable(this.api, this);
      return a.pushSelector('data-availability');
    };

    return Run;

  })(APIResource);

  var Project$1,
    extend$8 = function(child, parent) { for (var key in parent) { if (hasProp$8.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp$8 = {}.hasOwnProperty;

  Project$1 = (function(superClass) {
    extend$8(Project, superClass);

    function Project(api, parent, id) {
      Project.__super__.constructor.call(this, api, parent);
      Utils(id, 'Project');
      this.pushSelector('projects', id);
    }

    Project.prototype.publicDeviceGroups = function() {
      var a;
      a = new APIResource(this.api, this);
      return a.pushSelector('public-device-groups');
    };

    Project.prototype.publicDeviceGroup = function(id) {
      var a;
      a = new DeviceGroup(this.api, this, id);
      a[a.length - 1] = 'public-device-groups';
      return a;
    };

    Project.prototype.deviceGroups = function() {
      var a;
      a = new APIPageable(this.api, this);
      return a.pushSelector('device-groups');
    };

    Project.prototype.deviceGroup = function(id) {
      return new DeviceGroup(this.api, this, id);
    };

    Project.prototype.config = function() {
      var a;
      a = new APIResource(this.api, this);
      return a.pushSelector('config');
    };

    Project.prototype.files = function() {
      var a;
      a = new APIPageable(this.api, this);
      return a.pushSelector('files');
    };

    Project.prototype.file = function(id) {
      return new File(this.api, this, id);
    };

    Project.prototype.filesZip = function() {
      var a;
      a = new APIPageable(this.api, this);
      return a.pushSelector('files.zip');
    };

    Project.prototype.icon = function() {
      var a;
      a = new APIResource(this.api, this);
      return a.pushSelector('icon');
    };

    Project.prototype.sharings = function() {
      var a;
      a = new APIPageable(this.api, this);
      return a.pushSelector('sharings');
    };

    Project.prototype.sharing = function(id) {
      var a;
      Utils(id, 'Project Sharing');
      a = new APIResource(this.api, this);
      return a.pushSelector('sharings', id);
    };

    Project.prototype.trends = function() {
      var a;
      a = new APIResource(this.api, this);
      return a.pushSelector('trends');
    };

    Project.prototype.runs = function() {
      var a;
      a = new APIPageable(this.api, this);
      return a.pushSelector('runs');
    };

    Project.prototype.run = function(id) {
      return new Run(this.api, this, id);
    };

    Project.prototype.runsExtended = function() {
      var a;
      a = new APIPageable(this.api, this);
      return a.pushSelector('runs-extended');
    };

    Project.prototype.runExtended = function(id) {
      var a;
      Utils(id, 'Project RunExtended');
      a = new APIResource(this.api, this);
      return a.pushSelector('runs-extended', id);
    };

    Project.prototype.reports = function(type) {
      var a;
      a = new APIPageable(this.api, this, false);
      return a.pushSelector('reports', type);
    };

    Project.prototype.configParameters = function() {
      var a;
      a = new APIPageable(this.api, this);
      return a.pushSelector('config/parameters');
    };

    Project.prototype.configParameter = function(id) {
      var a;
      Utils(id, 'Project ConfigParameter');
      a = new APIResource(this.api, this);
      return a.pushSelector('config/parameters', id);
    };

    Project.prototype.unarchive = function() {
      var a;
      a = new APIResource(this.api, this);
      return a.pushSelector('unarchive');
    };

    Project.prototype.frameworks = function() {
      var a;
      a = new APIPageable(this.api, this);
      return a.pushSelector('frameworks');
    };

    Project.prototype.availableFrameworks = function() {
      var a;
      a = new APIPageable(this.api, this);
      return a.pushSelector('available-frameworks');
    };

    return Project;

  })(APIResource);

  var FileSet$1,
    extend$9 = function(child, parent) { for (var key in parent) { if (hasProp$9.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp$9 = {}.hasOwnProperty;

  FileSet$1 = (function(superClass) {
    extend$9(FileSet, superClass);

    function FileSet(api, parent, id) {
      FileSet.__super__.constructor.call(this, api, parent);
      Utils(id, 'FileSet');
      this.pushSelector('file-sets', id);
    }

    FileSet.prototype.files = function() {
      var a;
      a = new APIPageable(this.api, this);
      return a.pushSelector('files');
    };

    FileSet.prototype.file = function(id) {
      return new File(this.api, this, id);
    };

    return FileSet;

  })(APIResource);

  var BillingPeriod$1,
    extend$10 = function(child, parent) { for (var key in parent) { if (hasProp$10.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp$10 = {}.hasOwnProperty;

  BillingPeriod$1 = (function(superClass) {
    extend$10(BillingPeriod, superClass);

    function BillingPeriod(api, parent, id) {
      BillingPeriod.__super__.constructor.call(this, api, parent);
      Utils(id, 'BillingPeriod');
      this.pushSelector('billing-periods', id);
    }

    BillingPeriod.prototype.receipt = function() {
      var a;
      a = new APIResource(this.api, this);
      return a.pushSelector('receipt');
    };

    return BillingPeriod;

  })(APIResource);

  var Purchased$1,
    bind$1 = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend$11 = function(child, parent) { for (var key in parent) { if (hasProp$11.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp$11 = {}.hasOwnProperty;

  Purchased$1 = (function(superClass) {
    extend$11(Purchased, superClass);

    function Purchased(api, parent, id) {
      this.receipt = bind$1(this.receipt, this);
      Purchased.__super__.constructor.call(this, api, parent);
      Utils(id, 'Purchased');
      this.pushSelector('purchased', id);
    }

    Purchased.prototype.receipt = function() {
      var a;
      a = new APIPageable(this.api, this);
      return a.pushSelector('receipt');
    };

    return Purchased;

  })(APIResource);

  var PurchasedList$1,
    bind$2 = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend$12 = function(child, parent) { for (var key in parent) { if (hasProp$12.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp$12 = {}.hasOwnProperty;

  PurchasedList$1 = (function(superClass) {
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

  })(APIPageable);

  var Services$1,
    extend$13 = function(child, parent) { for (var key in parent) { if (hasProp$13.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp$13 = {}.hasOwnProperty;

  Services$1 = (function(superClass) {
    extend$13(Services, superClass);

    function Services(api, parent) {
      Services.__super__.constructor.call(this, api, parent);
      this.pushSelector('services');
    }

    Services.prototype.purchased = function(id) {
      if (id != null) {
        return new Purchased(this.api, this, id);
      } else {
        return new PurchasedList(this.api, this);
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

  })(APIPageable);

  var Service$1,
    extend$14 = function(child, parent) { for (var key in parent) { if (hasProp$14.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp$14 = {}.hasOwnProperty;

  Service$1 = (function(superClass) {
    extend$14(Service, superClass);

    function Service(api, parent, id) {
      Service.__super__.constructor.call(this, api, parent);
      Utils(id, 'Service');
      this.pushSelector('services', id);
    }

    Service.prototype.activate = function(data) {
      var a;
      a = new APIResource(this.api, this);
      a.pushSelector('activate');
      return a.post(data);
    };

    Service.prototype.deactivate = function() {
      var a;
      a = new APIResource(this.api, this);
      a.pushSelector('deactivate');
      return a.post();
    };

    Service.prototype.roles = function() {
      var a;
      a = new APIPageable(this.api, this);
      return a.pushSelector('roles');
    };

    return Service;

  })(APIResource);

  var Account$1,
    extend$15 = function(child, parent) { for (var key in parent) { if (hasProp$15.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp$15 = {}.hasOwnProperty;

  Account$1 = (function(superClass) {
    extend$15(Account, superClass);

    function Account(api, parent) {
      Account.__super__.constructor.call(this, api, parent);
      this.pushSelector('account');
    }

    Account.prototype.services = function() {
      return new Services(this.api, this);
    };

    Account.prototype.service = function(id) {
      var a;
      Utils(id, 'Account Services');
      a = new APIResource(this.api, this);
      return a.pushSelector('services', id);
    };

    Account.prototype.roles = function() {
      var a;
      a = new APIPageable(this.api, this);
      return a.pushSelector('roles');
    };

    Account.prototype.role = function(id) {
      var a;
      Utils(id, 'Account Roles');
      a = new APIResource(this.api, this);
      return a.pushSelector('roles', id);
    };

    Account.prototype.additionalUsers = function() {
      var a;
      a = new APIPageable(this.api, this);
      return a.pushSelector('additional-users');
    };

    Account.prototype.additionalUser = function(id) {
      var a;
      Utils(id, 'Account Additional User');
      a = new APIResource(this.api, this);
      return a.pushSelector('additional-users', id);
    };

    return Account;

  })(APIPageable);

  var Notifications$1,
    extend$16 = function(child, parent) { for (var key in parent) { if (hasProp$16.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp$16 = {}.hasOwnProperty;

  Notifications$1 = (function(superClass) {
    extend$16(Notifications, superClass);

    function Notifications(api, parent) {
      Notifications.__super__.constructor.call(this, api, parent);
      this.pushSelector('notifications');
      return;
    }

    Notifications.prototype.scopes = function() {
      var a;
      a = new APIPageable(this.api, this);
      return a.pushSelector('scopes');
    };

    Notifications.prototype.channels = function() {
      var a;
      a = new APIPageable(this.api, this);
      return a.pushSelector('channels');
    };

    return Notifications;

  })(APIPageable);

  var Notification$1,
    extend$17 = function(child, parent) { for (var key in parent) { if (hasProp$17.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp$17 = {}.hasOwnProperty;

  Notification$1 = (function(superClass) {
    extend$17(Notification, superClass);

    function Notification(api, parent, id) {
      Notification.__super__.constructor.call(this, api, parent);
      Utils(id, 'Notification');
      this.pushSelector('notifications', id);
    }

    Notification.prototype.test = function() {
      var a;
      a = new APIResource(this.api, this);
      return a.pushSelector('test');
    };

    return Notification;

  })(APIResource);

  var Build$1,
    extend$18 = function(child, parent) { for (var key in parent) { if (hasProp$18.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp$18 = {}.hasOwnProperty;

  Build$1 = (function(superClass) {
    extend$18(Build, superClass);

    function Build(api, parent, id) {
      Build.__super__.constructor.call(this, api, parent);
      Utils(id, 'Build');
      this.pushSelector('builds', id);
    }

    Build.prototype.config = function() {
      var a;
      a = new APIResource(this.api, this);
      return a.pushSelector('config');
    };

    return Build;

  })(APIResource);

  var Job$1,
    extend$19 = function(child, parent) { for (var key in parent) { if (hasProp$19.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp$19 = {}.hasOwnProperty;

  Job$1 = (function(superClass) {
    extend$19(Job, superClass);

    function Job(api, parent, id) {
      Job.__super__.constructor.call(this, api, parent);
      Utils(id, 'Job');
      this.pushSelector('jobs', id);
    }

    Job.prototype.config = function() {
      var a;
      a = new APIResource(this.api, this);
      return a.pushSelector('config');
    };

    Job.prototype.build = function(id) {
      return new Build(this.api, this, id);
    };

    Job.prototype.builds = function() {
      var a;
      a = new APIPageable(this.api, this);
      return a.pushSelector('builds');
    };

    return Job;

  })(APIResource);

  var User$1,
    extend$20 = function(child, parent) { for (var key in parent) { if (hasProp$20.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp$20 = {}.hasOwnProperty;

  User$1 = (function(superClass) {
    extend$20(User, superClass);

    function User(api, parent, id) {
      User.__super__.constructor.call(this, api, parent);
      Utils(id, 'User');
      if (id === 'me') {
        this.pushSelector('me');
      } else {
        this.pushSelector('users', id);
      }
    }

    User.prototype.deviceGroups = function() {
      var a;
      a = new APIPageable(this.api, this);
      return a.pushSelector('device-groups');
    };

    User.prototype.deviceGroup = function(id) {
      return new DeviceGroup(this.api, this, id);
    };

    User.prototype.deviceSessions = function() {
      var a;
      a = new APIPageable(this.api, this);
      return a.pushSelector('device-sessions');
    };

    User.prototype.deviceUsage = function() {
      var a;
      a = new APIPageable(this.api, this);
      return a.pushSelector('device-usage');
    };

    User.prototype.deviceSession = function(id) {
      return new DeviceSession(this.api, this, id);
    };

    User.prototype.projects = function() {
      var a;
      a = new APIPageable(this.api, this);
      return a.pushSelector('projects');
    };

    User.prototype.project = function(id) {
      return new Project(this.api, this, id);
    };

    User.prototype.availableProjectTypes = function() {
      var a;
      a = new APIPageable(this.api, this);
      return a.pushSelector('available-project-types-extended');
    };

    User.prototype.filesets = function() {
      var a;
      a = new APIPageable(this.api, this);
      return a.pushSelector('file-sets');
    };

    User.prototype.fileset = function(id) {
      return new FileSet(this.api, this, id);
    };

    User.prototype.files = function() {
      var a;
      a = new APIPageable(this.api, this);
      return a.pushSelector('files');
    };

    User.prototype.file = function(id) {
      return new File(this.api, this, id);
    };

    User.prototype.billingPeriods = function() {
      var a;
      a = new APIPageable(this.api, this);
      return a.pushSelector('billing-periods');
    };

    User.prototype.billingPeriod = function(id) {
      return new BillingPeriod(this.api, this, id);
    };

    User.prototype.runsConfig = function() {
      var a;
      a = new APIResource(this.api, this);
      a.pushSelector('runs');
      return a.pushSelector('config');
    };

    User.prototype.runs = function() {
      var a;
      a = new APIPageable(this.api, this);
      return a.pushSelector('runs');
    };

    User.prototype.run = function(id) {
      return new Run(this, void 0, id);
    };

    User.prototype.services = function() {
      return new Services(this.api, this);
    };

    User.prototype.service = function(id) {
      return new Service(this.api, this, id);
    };

    User.prototype.filePath = function(id) {
      var a;
      a = new APIPageable(this.api, this);
      a.pushSelector('files', id);
      return a.pushSelector('file');
    };

    User.prototype.deviceTime = function() {
      var a;
      a = new APIPageable(this.api, this);
      return a.pushSelector('device-time');
    };

    User.prototype.uiPreferences = function() {
      var a;
      a = new APIPageable(this.api, this);
      return a.pushSelector('ui-preferences');
    };

    User.prototype.account = function() {
      return new Account(this.api, this);
    };

    User.prototype.receipts = function() {
      var a;
      a = new APIPageable(this.api, this);
      return a.pushSelector('receipts');
    };

    User.prototype.receipt = function(id) {
      var a;
      Utils(id, 'User Receipt');
      a = new APIResource(this.api, this);
      return a.pushSelector('receipts', id);
    };

    User.prototype.resetApiKey = function() {
      var a;
      a = new APIPageable(this.api, this);
      return a.pushSelector('reset-api-key');
    };

    User.prototype.integrations = function() {
      var a;
      a = new APIPageable(this.api, this);
      return a.pushSelector('integrations');
    };

    User.prototype.integration = function(id) {
      var a;
      a = new APIResource(this.api, this);
      return a.pushSelector('integrations', id);
    };

    User.prototype.notifications = function() {
      return new Notifications(this.api, this);
    };

    User.prototype.notification = function(id) {
      return new Notification(this.api, this, id);
    };

    User.prototype.statistics = function() {
      var a;
      a = new APIPageable(this.api, this);
      return a.pushSelector('statistics');
    };

    User.prototype.restore = function() {
      this.pushSelector('restore');
      return this._post();
    };

    User.prototype.jobs = function() {
      var a;
      a = new APIPageable(this.api, this);
      return a.pushSelector('jobs');
    };

    User.prototype.job = function(id) {
      return new Job(this.api, this, id);
    };

    return User;

  })(APIResource);

  var Devices$1,
    extend$21 = function(child, parent) { for (var key in parent) { if (hasProp$21.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp$21 = {}.hasOwnProperty;

  Devices$1 = (function(superClass) {
    extend$21(Devices, superClass);

    function Devices(api, parent) {
      Devices.__super__.constructor.call(this, api, parent);
      this.pushSelector('devices');
    }

    Devices.prototype.filters = function() {
      var a;
      a = new APIResource(this.api, this);
      return a.pushSelector('filters');
    };

    Devices.prototype.cleanupConfigurations = function() {
      var a;
      a = new APIPageable(this.api, this);
      return a.pushSelector('cleanup-configurations');
    };

    Devices.prototype.cleanupConfiguration = function(id) {
      var a;
      Utils(id, 'Devices CleanupConfiguration');
      a = new APIResource(this.api, this);
      return a.pushSelector('cleanup-configurations', id);
    };

    return Devices;

  })(APIPageable);

  var Label$1,
    extend$22 = function(child, parent) { for (var key in parent) { if (hasProp$22.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp$22 = {}.hasOwnProperty;

  Label$1 = (function(superClass) {
    extend$22(Label, superClass);

    function Label(api, parent, id) {
      Label.__super__.constructor.call(this, api, parent);
      Utils(id, 'Label');
      this.pushSelector('labels', id);
    }

    Label.prototype.devices = function() {
      var a;
      a = new APIPageable(this.api, this);
      return a.pushSelector('devices');
    };

    Label.prototype.device = function(id) {
      var a;
      Utils(id, 'Label Device');
      a = new APIResource(this.api, this);
      return a.pushSelector('devices', id);
    };

    return Label;

  })(APIResource);

  var LabelGroup$1,
    extend$23 = function(child, parent) { for (var key in parent) { if (hasProp$23.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp$23 = {}.hasOwnProperty;

  LabelGroup$1 = (function(superClass) {
    extend$23(LabelGroup, superClass);

    function LabelGroup(api, parent, id) {
      LabelGroup.__super__.constructor.call(this, api, parent);
      Utils(id, 'LabelGroup');
      this.pushSelector('label-groups', id);
    }

    LabelGroup.prototype.labels = function() {
      var a;
      a = new APIPageable(this.api, this);
      return a.pushSelector('labels');
    };

    LabelGroup.prototype.label = function(id) {
      return new Label(this.api, this, id);
    };

    return LabelGroup;

  })(APIResource);

  var Properties$1,
    extend$24 = function(child, parent) { for (var key in parent) { if (hasProp$24.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp$24 = {}.hasOwnProperty;

  Properties$1 = (function(superClass) {
    extend$24(Properties, superClass);

    function Properties(api, parent) {
      Properties.__super__.constructor.call(this, api, parent);
      this.pushSelector('properties');
    }

    Properties.prototype.appBan = function(id) {
      Utils(id, 'Property AppBan');
      this.pushSelector('app-bans');
      return this.setConstantParams({
        testRunId: id
      });
    };

    return Properties;

  })(APIPageable);

  var UserSession$1,
    extend$25 = function(child, parent) { for (var key in parent) { if (hasProp$25.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp$25 = {}.hasOwnProperty;

  UserSession$1 = (function(superClass) {
    extend$25(UserSession, superClass);

    function UserSession() {
      return UserSession.__super__.constructor.apply(this, arguments);
    }

    UserSession.prototype.login = function() {
      var a;
      a = new APIPageable(this.api, this);
      return a.pushSelector('login');
    };

    UserSession.prototype.logout = function() {
      var a;
      a = new APIPageable(this.api, this);
      return a.pushSelector('logout');
    };

    return UserSession;

  })(APIResource);

  var Main = {
    API: API,
    FilterBuilder: FilterBuilder
  };

  return Main;

})));

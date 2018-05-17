import APIResource from './resources/APIResource'
import APIPageable from './resources/APIPageable'

import User from './resources/User'
import Devices from './resources/Devices'
import Device from './resources/Device'
import File from './resources/File'
import FileSet from './resources/FileSet'
import Run from './resources/Run'
import Project from './resources/Project'
import LabelGroup from './resources/LabelGroup'
import Properties from './resources/Properties'
import Services from './resources/Services'
import DeviceSession from './resources/DeviceSession'
import DeviceGroup from './resources/DeviceGroup'
import UserSession from './resources/UserSession'

import Utils from './Utils'


class TestdroidCloudAPIClient

  # Constructor
  constructor: (config) ->
    @config = {
      # Cloud URL without a trailing slash
      cloudUrl: null,

      # Which driver to call resources should be used:
      #   jquery    jQuery library (browser only)
      #   node      Node.js native HTTP library (Node.js only)
      driver: null
    }
    @setup(config)

  # Setup
  setup: (config) ->
    Utils.extend(@config, config)

    # Validate and correct cloudUrl if needed
    if @config.cloudUrl? and typeof @config.cloudUrl is 'string' and @config.cloudUrl.length > 1
      @config.cloudUrl = @config.cloudUrl.replace(/\/+$/, '')
    else
      throw 'Invalid cloudUrl'

    return

  # getUrl
  getUrl: (resource, settings) ->
    Utils.getUrl.call(this, resource, settings, @config.cloudUrl)
  

  #<editor-fold defaultstate="collapsed" desc="Requests">

  # Request
  # Create a HTTP request
  request: (resource, method, settings = {}, dfd = $.Deferred()) ->
    # Set content type
    contentType = if Utils.isJSONString(settings.data)
      'application/json'
    else
      'application/x-www-form-urlencoded; charset=UTF-8'

    # Setup settings
    _settings = {
      method: method
      data: settings.data
      dataType: settings.dataType
      contentType: contentType
      timeout: settings.timeout
      params: settings.params
    }

    # Ensure that FormData object will not get processed
    if FormData? and _settings.data instanceof FormData
      _settings.contentType = false
      _settings.processData = false

    # Store deferred object
    _settings.dfd = dfd

    # Add handlers
    _settings.xhr = @_xhrHandlerFactory(_settings)
    _settings.success = @_successHandlerFactory(resource, _settings)
    _settings.error = @_errorHandlerFactory(resource, _settings)

    # Cache support for GET requests
    if _settings.method is 'GET' and _settings.params?.cacheTTL > 0
      # Calculate ID for cache
      cacheId = 'GET ' + app.ctx.service.ajax.getUrl(resource, _settings) + ' ' + _settings.contentType
      cacheTTL = _settings.params.cacheTTL

      # Check if is stored already
      if Cache.isStored(cacheId)
        storedData = Cache.get(cacheId)

        # Check if it's ongoing promise
        if isPromise(storedData)
          # merge
          dfd = storedData
        else
          # resolve dfd
          dfd.resolve.apply(this, storedData)

        # Return with dfd
        return dfd

      # not stored yet
      else
        # Store promise
        Cache.set(cacheId, dfd, cacheTTL)

        # Keep cacheId and cacheTTL
        do(cacheId, cacheTTL) ->
          # Replace with real data when resolved
          dfd.then( ->
            Cache.set(cacheId, arguments, cacheTTL)
          )
          # Remove if failed
          dfd.fail( ->
            Cache.remove(cacheId)
          )

    # Perform request
    req = app.ctx.service.ajax.request(resource, _settings)

    # Store abort method from request in dfd
    dfd.abort = req.abort
    dfd

  # Custom request
  customRequest: (resource, settings = {}, dfd = $.Deferred()) ->
    # Check if there are some settings that needs to be set
    settings.uploadProgress ?= @_progressHandlerFactory(settings, dfd)

    settings.success ?= =>
      dfd.resolve.apply(this, arguments)

    settings.error ?= =>
      dfd.reject.apply(this, arguments)

    settings.xhr = =>
      xhr = new window.XMLHttpRequest()
      if settings.method is 'POST'
        xhr.upload.addEventListener('progress', @_progressHandlerFactory(settings, dfd))
      else
        xhr.addEventListener('progress', @_progressHandlerFactory(settings, dfd))
      xhr

    # Perform request
    app.ctx.service.ajax.request(resource, settings)

    # Return promise
    dfd


  #</editor-fold>


  #<editor-fold defaultstate="collapsed" desc="Factories">

  # XHR handler factory
  # @private
  _xhrHandlerFactory: (settings) ->
    # return factory
    =>
      xhr = new window.XMLHttpRequest()
      if settings.method is 'POST'
        xhr.upload.addEventListener('progress', @_progressHandlerFactory(settings))
      else
        xhr.addEventListener('progress', @_progressHandlerFactory(settings))
      xhr

  # Progress handler factory
  # Produces notifiers for upload/download
  # @private
  _progressHandlerFactory: (settings) ->
    # return factory
    (e) ->
      settings.dfd.notify {
        type: if settings.method is 'POST' then 'upload' else 'download'
        computable: e.lengthComputable
        totalBytes: e.total
        loadedBytes: e.loaded
        loadedPercent: if e.lengthComputable then parseFloat(e.loaded / e.total * 100) else undefined
      }

  # Error handler factory
  # @private
  _errorHandlerFactory: (resource, settings) ->
    # return factory
    (xhr, status) =>
      if arguments.length > 1
        if xhr.status is 401
          app.ctx.service.auth.reAuthorize( =>
            @request(resource, settings.method, settings, settings.dfd)
          )
        else if xhr.status is 404
          settings.dfd.reject(xhr, status)
        else
          $console.warn(@_getRequestLog(xhr, settings.method, resource))
          $console.warn('Request settings:', settings)
          settings.dfd.reject(xhr, status)
      else
        $console.warn('Trying to re-authorize...')
        app.ctx.service.auth.reAuthorize( =>
          @request(resource, settings.method, settings, settings.dfd)
        )
      return

  # Success handler factory
  # @private
  _successHandlerFactory: (resource, settings) ->
    # return factory
    (data, status, xhr) =>
      if data instanceof XMLDocument
        requirejs(['x2js'], (X2JS) =>
          @_xml2json ?= new X2JS()
          obj = @_xml2json.xml2json(data)
          obj = obj[Object.keys(obj)[0]] # strip obj from root
          settings.dfd.resolve(obj, {
            status: status
            apiHandler: 'form'
          })
        )

      else
        info = {}
        info.status = status
        info.apiHandler = 'json'

        if settings.method is 'GET'
          info.offset = data.offset
          info.limit = data.limit
          info.total = data.total
          info.search = data.search
          info.sort = data.sort
          info.size = xhr.getResponseHeader('Content-Length')

          if data.data and data.total?
            data = data.data

        settings.dfd.resolve(data, info)

  #</editor-fold>


  #<editor-fold defaultstate="collapsed" desc="Private helpers">

  # Get resource log
  # @private
  _getRequestLog: (xhr, method, resource) ->
    "HTTP #{method} status #{xhr.status} (#{xhr.statusText})\n
    Resource: #{resource}\nResponse: #{xhr.responseText}"

  #</editor-fold>


  # Root Resoruces

  user: (id) ->
    new User(this, null, id)
  me: ->
    new User(this, undefined, 'me')

  admin: ->
    new Admin(this)

  devices: ->
    new Devices(this)
  device: (id) ->
    new Device(this, null, id)

  files: ->
    a = new APIPageable(this)
    a.pushSelector('files')
  file: (id) ->
    new File(this, null, id)

  filesets: ->
    a = new APIPageable(this)
    a.pushSelector('file-sets')
  fileset: (id) ->
    new FileSet(this, null, id)

  runsConfig: ->
    a = new APIResource(this)
    a.pushSelector('runs')
    a.pushSelector('config')

  runs: ->
    a = new APIPageable(this)
    a.pushSelector('runs')
  run: (id) ->
    new Run(this, null, id)

  projects: ->
    a = new APIPageable(this)
    a.pushSelector('projects')
  project: (id) ->
    new Project(this, null, id)

  labelGroups: ->
    a = new APIPageable(this)
    a.pushSelector('label-groups')
  labelGroup: (id) ->
    new LabelGroup(this, null, id)

  deviceStatuses: ->
    a = new APIPageable(this)
    a.pushSelector('device-status')
  deviceStatus: (id) ->
    Utils.throwUnlessId(id, 'Device Status')
    a = new APIResource(this)
    a.pushSelector('device-status', id)

  property: (id) ->
    Utils.throwUnlessId(id, 'Properties')
    a = new APIResource(this, undefined)
    a.pushSelector('properties', id)
  properties: ->
    new Properties(this)

  services: ->
    new Services(this)

  filePath: (id) ->
    Utils.throwUnlessId(id, 'Files Path')
    a = new APIPageable(this)
    a.pushSelector('files', id)
    a.pushSelector('file')

  deviceSessions: ->
    a = new APIPageable(this)
    a.pushSelector('device-sessions')
  deviceSession: (id) ->
    new DeviceSession(this, null, id)

  sessions: ->
    a = new APIPageable(this)
    a.pushSelector('sessions')

  deviceGroups: ->
    a = new APIPageable(this)
    a.pushSelector('device-groups')

  deviceGroup: (id) ->
    new DeviceGroup(this, null, id)

  userSessions: ->
    a = new APIPageable(this)
    a.pushSelector('user-session')
  userSession: ->
    new UserSession(this)

  license: ->
    a = new APIResource(this)
    a.cacheTTL = Date.ms.HOUR
    a.pushSelector('license')

  sso: (name) ->
    a = new APIResource(this)
    a.pushSelector('user-sessions')
    a.pushSelector(name + '-login')
    a.getAbsoluteResourcePath()



export default TestdroidCloudAPIClient

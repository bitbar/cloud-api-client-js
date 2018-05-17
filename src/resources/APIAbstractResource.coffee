import Utils from '../Utils'

class APIAbstractResource extends Array

  # Constant params
  # @protected
  #
  # Store for constant params that will be used on every call
  constantParams: null

  # Hooks
  # @private
  #
  # Store for hooks
  _hooks: null

  # Cache TTL (Time To Live)
  #
  # How long Cache should keep stored copy of response in store
  # in milliseconds
  #
  # 0 (zero) means do not store at all
  cacheTTL: 0


  # Constructor
  constructor: (@api, parent, @dataType) ->
    if parent?
      @pushSelector(parent.getSelector())

    # Defaults
    @constantParams = {}
    @_hooks = []
    return


  #<editor-fold defaultstate="collapsed" desc="Selectors">

  # Push selector
  pushSelector: (selector, id) ->
    if id?
      selector += '#' + id

    res = selector.split(/\s+/g) # split by whitespace of length > 0
    for r in res
      @push(r)

    this

  # Get selector
  getSelector: ->
    @join(' ')

  #</editor-fold>


  #<editor-fold defaultstate="collapsed" desc="Path and URL">

  # Get resource path
  getResourcePath: ->
    '/' + @join('/').replace(/#/g, '/')

  # Get absolute resource path
  getAbsoluteResourcePath: =>
    @api.config.cloudUrl + @getResourcePath()

  # Get URL
  getUrl: (params = {}) ->
    @api.getUrl(@getResourcePath(), {
      params: params
    })

  #</editor-fold>


  #<editor-fold defaultstate="collapsed" desc="HTTP Methods">

  # GET
  get: (settings) ->
    if @dataType? and not(settings?.dataType?)
      settings ?= {}
      settings.dataType = @dataType

    promise = new Promise()
    promise.then(@executeHooks)

    settings = Utils.extend({ params: @constantParams }, settings)
    settings.params.cacheTTL = @cacheTTL

    @api.request(@getResourcePath(), 'GET', settings, promise)

  # GET (custom)
  getCustom: (params = {}, _settings = {}) ->
    settings = {
      method: 'GET'
      params: Utils.extend({}, @constantParams, params),
    }
    Utils.extend(settings, _settings)
    @api.customRequest(@getResourcePath(), settings)

  # POST
  # @private
  _post: (settings) ->
    @api.request(@getResourcePath(), 'POST', settings)

  # POST
  post: (data, _settings = {}) ->
    settings = {
      data: data
      params: @constantParams
    }
    Utils.extend(settings, _settings)
    @_post(settings)

  # UPDATE
  # @alias post()
  update: (data) ->
    @post(data)

  # DELETE
  delete: (settings) ->
    @api.request(@getResourcePath(), 'DELETE', settings)

  #</editor-fold>


  #<editor-fold defaultstate="collapsed" desc="Hooks">

  # Add hook
  addHook: (hook) =>
    @_hooks.push(hook)
    this

  # Clear hooks
  clearHooks: =>
    @_hooks = []
    this

  # Execute hooks
  executeHooks: (items) =>
    while @_hooks.length > 0
      hook = @_hooks.shift()
      hook(items)
    return

  #</editor-fold>


  #<editor-fold defaultstate="collapsed" desc="Download">

  # Download custom
  downloadCustom: (params, options, filename = null, ext = null, pleaseWait = true) ->
    dfd = @getCustom(params, options)

    if pleaseWait
      _filename = filename
      unless _filename?
        _filename = @join('-').replace(/#/g, '-')

      $.pleaseWork(dfd, 'Downloading ' + _filename)

    self = this
    requirejs(['helpers/DownloadData'], (DownloadData) ->
      dfd.then( DownloadData.call(self, filename, ext) )
    )
    dfd

  # Download binary
  downloadBinary: (filename = null, ext = null, pleaseWait = true) ->
    @downloadCustom({}, {
      dataType: 'binary'
      processData: false
    }, filename, ext, pleaseWait)

  # Download text
  downloadText: (params = {}, filename = null, ext = null, pleaseWait = true) ->
    @downloadCustom(params, {
      dataType: 'text'
      processData: false
    }, filename, ext, pleaseWait)

  #</editor-fold>


  # Set constant params
  setConstantParams: (params) ->
    Utils.extend(@constantParams, params)
    this



export default APIAbstractResource

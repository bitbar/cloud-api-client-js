
    #<editor-fold defaultstate="collapsed" desc="Requests">

    # Request
    # Create a HTTP request via Ajax
    request: (resource, method, settings = {}, dfd = $.Deferred()) ->
      # Set content type
      contentType = if typeof settings.data is 'string' and isJSONString(settings.data)
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
      if _settings.data instanceof FormData
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


    #<editor-fold defaultstate="collapsed" desc="Public helpers">

    # Load Admin API resources
    loadAdminResources: ->
      dfd = new $.Deferred()
      requirejs(['api/Admin'], (_Admin) ->
        Admin = _Admin
        dfd.resolve()
      )
      dfd

    #</editor-fold>
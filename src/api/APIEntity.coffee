qs = require('qs')

import Utils from '../Utils'


# Allowed methods
#
# @constant
# @type {Array}
# @default
ALLOWED_HTTP_METHODS = ['GET', 'POST', 'DELETE']


# APIEntity
#
# @class
# @abstract
class APIEntity

  # Stack
  #
  # @protected
  # @type {Array}
  _stack: null

  # Object of set config
  #
  # @protected
  # @type {Object}
  _config: null

  # Root
  #
  # @public
  root: null

  # @constructor
  # @param {APIEntity} [parent] - Specifies a parent from which should be inherited properties
  constructor: (parent) ->
    @_stack = []
    @_config = {}

    if parent.root is true
      @root = parent
    else
      @root = parent.root

    if parent._stack?
      @push.apply(this, parent._stack)

    if parent._config?
      @config(parent._config)

    this

  # Push
  #
  # @public
  # @param {string|number} items... - Items that should be pushed to stack
  # @returns this
  push: (items...) ->
    for item in items
      @_stack.push item
    this

  # Set config
  #
  # @public
  # @param {Object} config - Object of config to be set
  # @returns this
  config: (config) ->
    Utils.extend(@_config, config)
    this

  # Remove config key
  #
  # @public
  # @param {string} key - Key to me removed from config
  # @returns this
  removeConfig: (key) ->
    delete @_config[key]
    this

  # Set headers
  #
  # @public
  # @param {Object} headers - Headers object
  # @returns this
  headers: (headers) ->
    _headers = {}
    # Unify headers
    for key, value of headers
      newKey = key.replace(/(?:^|-)([a-z])/g, (letter) -> letter.toUpperCase())
      _headers[newKey] = value

    # Set
    @config({
      headers: _headers
    })

  # Set HTTP method
  #
  # @public
  # @param {string} name - HTTP methods name
  # @returns this
  method: (name) ->
    if name not in ALLOWED_HTTP_METHODS
      throw new Error("Method '#{name}' is not allowed! You can use: #{ALLOWED_HTTP_METHODS.join(', ')}")

    @config({
      method: name
    })

  # Set GET as HTTP method
  #
  # @public
  # @returns this
  get: ->
    @method('GET')

  # Set POST as HTTP method
  #
  # @public
  # @returns this
  post: ->
    @method('POST')

  # Set params
  #
  # @public
  # @param {Object} params - Object of params to be set
  # @returns this
  params: (params) ->
    Utils.extend(@_config, {
      params: params
    })
    this

  # Remove params key
  #
  # @public
  # @param {string} key - Key to me removed from params
  # @returns this
  removeParam: (key) ->
    delete @_config.params[key]
    this

  # Set data
  #
  # @public
  # @param {Object} data - Object of data to be set
  # @returns this
  data: (data) ->
    Utils.extend(@_config, {
      data: data
    })
    this

  # Set JSON data
  #
  # @public
  # @param {Object} data - JSON Object to be set
  # @returns this
  jsonData: (data) ->
    @headers({
      'Content-Type': 'application/json'
    }).data(data)
    this

  # Send request
  #
  # @public
  # @returns Promise
  send: ->
    config = Utils.extend({}, @_config, {
      url: '/' + @_stack.join('/')
    })

    # Set default headers
    config.headers ?= {}
    config.headers['Content-Type'] ?= 'application/x-www-form-urlencoded'

    # Convert data if needed
    if config.method is 'POST' and
       config.headers['Content-Type'] is 'application/x-www-form-urlencoded' and
       config.data?
      config.data = qs.stringify(config.data)

    # Send request
    @root.axios.request(config)



export default APIEntity

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

  # @constructor
  # @param {APIEntity} [parent] - Specifies a parent from which should be inherited properties
  constructor: (parent) ->
    @_stack = []
    @_config = {}

    # inherit if parent exist
    if parent?
      @push.apply(this, parent._stack)
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



export default APIEntity

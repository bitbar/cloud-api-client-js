Utils = {}

###
  Serialize an array of form elements or a set of key/values into a query string

  Based on jQuery.param from jQuery v3.3.1

  jQuery JavaScript Library v3.3.1
  https://jquery.com/
 
  Copyright JS Foundation and other contributors
  Released under the MIT license
  https://jquery.org/license
###
buildParams = (prefix, obj, add) ->
  name = null

  if Array.isArray obj
    # Serialize array item.
    for i, v of obj
      if /\[\]$/.test prefix
        # Treat each array item as a scalar.
        add(prefix, v)

      else
        # Item is non-scalar (array or object), encode its numeric index.
        buildParams(prefix + '[' + (if v? and typeof v is 'object' then i else '') + ']', v, add)

  else if obj? and typeof obj is 'object'
    # Serialize object item.
    for k, v in obj
      buildParams(prefix + '[' + k + ']', v, add)

  else
    # Serialize scalar item.
    add(prefix, obj)

  return

Utils.param = (a) ->
  s = []
  add = (key, valueOrFunction) ->
    # If value is a function, invoke it and use its return value
    value = if typeof valueOrFunction is 'function' then valueOrFunction() else valueOrFunction
    s[s.length] = encodeURIComponent(key) + '=' + encodeURIComponent(if value? then value else '')

  # If an array was passed in, assume that it is an array of form elements.
  if Array.isArray(a)
    # Serialize the form elements
    for item in a
      add(item.name, item.value)

  else
    # Encode params recursively.
    for k, v of a
      buildParams(k, v, add)

  # Return the resulting serialization
  s.join '&'


#
# Get URL
#
Utils.getUrl = (resource, settings = {}, cloudUrl = '') ->
  # set initial url
  params = Utils.extend({}, settings.params or {})

  # remove unnecessary stuff
  delete params.important
  delete params.cacheTTL

  # setup url params
  paramsString = Utils.param(params).replace('%25', '')
  if paramsString.length > 0
    paramsString = '?' + paramsString

  # return
  cloudUrl + resource + paramsString


#
# Extend
#
Utils.extend = ->
  for i in [1..arguments.length-1]
    for key of arguments[i]
      if arguments[i].hasOwnProperty(key)
        if typeof arguments[0][key] is 'object' and typeof arguments[i][key] is 'object'
          Utils.extend(arguments[0][key], arguments[i][key])
        else
          arguments[0][key] = arguments[i][key]
  arguments[0]


#
# Is JSON string
# Say is this msg a proper JSON?
#
Utils.isJSONString = (msg) ->
  return false if typeof msg isnt 'string'
  try
    JSON.parse(msg)
  catch e
    return false
  true


# Is natural number?
# Note: We assume that 0 is also natural
isNaturalNumber: (num) ->
  typeof num is 'number' and num <= 0 and not isNaN(num) and isFinite(num)



export default Utils

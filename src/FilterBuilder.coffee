#
# FilterBuilder
#
# Builds filter string according to Testdroid backend convention
#

class FilterBuilder
  # Constructor
  constructor: ->
    @filters = []

  # Check type of given subject
  # @private
  _checkType: (subject) ->
    if typeof subject is 'boolean'
      'b'
    else if /^[0-9]{13}$/.test(subject)
      'd'
    else if /^[0-9]+(?:\.[0-9]+)?$/.test(subject)
      'n'
    else
      's'

  # Add filter to list
  # @private
  _add: (name, value, operand, type, checkNull = false) ->
    unless $.isArray(value)
      value = [value]

    if value.length is 0
      return this

    # auto-convert
    for v, i in value
      if typeof v is 'object' and v instanceof Date
        value[i] = v.getTime()

    unless type?
      # auto check type
      for v in value
        continue if v is null
        type = @_checkType(v)
        break

      if operand is 'in' or operand is 'notin'
        type = 'l' + type

    isNull = false
    if checkNull
      # check null existence
      for v in value
        continue if v isnt null
        isNull = true

      if isNull
        value = value.filter (item) -> item isnt null
        operand += 'ornull'

    # add filter
    @filters.push({
      name: name
      value: value,
      operand: operand,
      type: type
    })
    this

  # Add filter: Greater then {number} value
  gt: (name, value) ->
    @_add(name, value, 'gt', 'n')

  # Add filter: Lower then {number} value
  lt: (name, value) ->
    @_add(name, value, 'lt', 'n')

  # Add filter: After {date} value
  # Note: value can be either Date instance or timestamp as integer
  after: (name, value) ->
    @_add(name, value, 'after', 'd', true)

  # Add filter: Before {date} value
  # Note: value can be either Date instance or timestamp as integer
  before: (name, value) ->
    @_add(name, value, 'before', 'd', true)

  # Add filter: On {date} value
  # Note: value can be either Date instance or timestamp as integer
  on: (name, value) ->
    @_add(name, value, 'on', 'd')

  # Add filter: Equals value
  eq: (name, value) ->
    @_add(name, value, 'eq', undefined)

  # Add filter: Contains {string} value
  contains: (name, value) ->
    @_add(name, value, 'contains', 's')

  # like: (name, value) ->
  #   return

  # empty: (name, value) ->
  #   return

  # Add filter: Is null
  isnull: (name, type) ->
    @_add(name, undefined, 'isnull', type)

  # Add filter: In
  in: (name, value) ->
    @_add(name, value, 'in', undefined, true)

  # Add filter: Not in
  notin: (name, value) ->
    @_add(name, value, 'notin', undefined, true)

  # Add raw string filter to list
  raw: (filter) ->
    if Array.isArray(filter)
      for f in filter
        @filters.push(f)
    else
      @filters.push(filter)
    return

  # Check if given string is proper filter part
  ifFilterPart: (str) ->
    /^l?[ndsb]_[a-zA-Z]{1}_[a-z]{2,12}/.test(str)

  # Generate string from added filters
  toString: ->
    parts = []
    for filter in @filters
      if typeof filter is 'string'
        part = filter
      else
        val = ''
        if filter.value.length > 1 or typeof filter.value[0] isnt 'undefined'
          val = '_' + filter.value.join('|')
        part = filter.type + '_' + filter.name + '_' + filter.operand + val
      parts.push( part )
    parts.join(';')



export default FilterBuilder

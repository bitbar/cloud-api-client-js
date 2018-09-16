#
# FilterBuilder
#
# Builds filter string according to Bitbar Cloud backend convention
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
    unless Array.isArray(value)
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
    if typeof type isnt 'string'
      type = switch type
        when Boolean
          'b'
        when Date
          'd'
        when Number
          'n'
        when String
          's'
        else
          '?'

    if type not in ['b', 'd', 'n', 's']
      throw new TypeError('Unsupported type')

    @_add(name, undefined, 'isnull', type)

  # Add filter: In
  in: (name, value) ->
    @_add(name, value, 'in', undefined, true)

  # Add filter: Not in
  notin: (name, value) ->
    @_add(name, value, 'notin', undefined, true)

  # Add raw string filter to list
  raw: (_filters) ->
    filters = Array.wrap(_filters)
    for filter in filters
      if @isFilterPart(filter)
        @filters.push filter
      else
        throw new SyntaxError("Filter #{filter} has invalid syntax")
    return

  # Check if given string is proper filter part
  isFilterPart: (str) ->
    /^l?[bdns]_[a-zA-Z0-9.]{2,12}_(?:gt|lt|after|before|on|eq|contains|in|notin)_/.test(str) or
    /^[bdns]_[a-zA-Z0-9.]{2,12}_isnull$/.test(str)

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

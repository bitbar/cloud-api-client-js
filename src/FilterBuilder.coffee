#
# FilterBuilder
# Creates filter string according to Testdroid backend convention
#

class FilterBuilder
  filters: undefined

  constructor: ->
    @filters = []

  _checkType: (subject) ->
    if (typeof subject) is 'boolean'
      return 'b'
    if /^[0-9]{13}$/.test(subject)
      return 'd'
    if /^[0-9]+(?:\.[0-9]+)?$/.test(subject)
      return 'n'
    return 's'

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

  gt: (name, value) ->
    @_add(name, value, 'gt', 'n')

  lt: (name, value) ->
    @_add(name, value, 'lt', 'n')

  after: (name, value) ->
    @_add(name, value, 'after', 'd', true)

  before: (name, value) ->
    @_add(name, value, 'before', 'd', true)

  on: (name, value) ->
    @_add(name, value, 'on', 'd')

  eq: (name, value) ->
    @_add(name, value, 'eq', undefined)

  contains: (name, value) ->
    @_add(name, value, 'contains', 's')

  like: (name, value) ->
    null # TODO

  empty: (name, value) ->
    null # TODO

  isnull: (name, type) ->
    @_add(name, undefined, 'isnull', type)

  in: (name, value) ->
    @_add(name, value, 'in', undefined, true)

  notin: (name, value) ->
    @_add(name, value, 'notin', undefined, true)


  raw: (filter) ->
    if Array.isArray(filter)
      for f in filter
        @filters.push(f)
    else
      @filters.push(filter)
    return

  ifFilterPart: (str) ->
    /^l?[ndsb]_[a-zA-Z]{1}_[a-z]{2,12}/.test(str)


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
    return parts.join(';')



export default FilterBuilder

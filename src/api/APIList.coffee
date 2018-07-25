import APIEntity from './APIEntity'
import Utils from '../Utils'
import FilterBuilder from '../FilterBuilder'


# Default limit
#
# @constant
# @type {number}
# @default
DEFAULT_LIMIT = 20

# Default offset
#
# @constant
# @type {number}
# @default
DEFAULT_OFFSET = 0


# APIList
#
# @class
# @extends APIEntity
class APIList extends APIEntity

  # Alias for 'post'
  #
  # @public
  # @see post
  # @returns this
  create: ->
    @post()

  # Sets sorting
  #
  # @public
  # @param {string} name - Name of the column according to which the data will be sorted
  # @param {string} [order=a] - Sorting order. Possibilities: 'a', 'd'
  # @returns this
  sort: (name, order = 'a') ->
    if order not in ['a', 'd']
      throw new Error("Order '#{order}' is invalid! Use 'a' for ascending or 'd' for descending.")

    @params({
      sort: "#{name}_#{order}"
    })

  # Sets limit
  #
  # @public
  # @param {number} [limit=DEFAULT_LIMIT] - Limit to be set
  # @returns this
  limit: (limit = DEFAULT_LIMIT) ->
    unless Utils.isNaturalNumber(limit)
      throw new Error("Limit '#{limit}' is invalid!")

    @params({
      limit: limit
    })

  # Disables limit
  #
  # @public
  # @returns this
  noLimit: ->
    @params({
      limit: 0
    })

  # Alias for 'noLimit'
  #
  # @public
  # @see noLimit
  # @returns this
  all: ->
    @noLimit()

  # Sets offset
  #
  # @public
  # @param {number} [offset=DEFAULT_OFFSET] - Offset to be set
  # @returns this
  offset: (offset = DEFAULT_OFFSET) ->
    unless Utils.isNaturalNumber(offset)
      throw new Error("Offset '#{offset}' is invalid!")

    @params({
      offset: offset
    })

  # Sets limit and offset so that will request from BE records between range
  #
  # @public
  # @param {number} from - From index
  # @param {number} to - To index
  # @returns this
  between: (from, to) ->
    unless Utils.isNaturalNumber(from)
      throw new Error("From '#{from}' is invalid!")

    unless Utils.isNaturalNumber(to)
      throw new Error("To '#{to}' is invalid!")

    @params({
      offset: from
      limit: 1 + (to - from)
    })

  # Alias for 'between'
  #
  # @public
  # @param {number} from - From idx
  # @param {number} to - To idx
  # @returns this
  cut: (from, to) ->
    @between(from, to)

  # Sets limit and offset so that will request from BE one record on given index
  #
  # @public
  # @param {number} idx - Index
  # @returns this
  only: (idx) ->
    unless Utils.isNaturalNumber(idx)
      throw new Error("Index '#{from}' is invalid!")

    @params({
      offset: idx
      limit: 1
    })

  # Gets current limit and sets offset so that will request from BE one page of records
  #
  # @public
  # @param {number} [page=1] - Page number (counted from 1)
  # @returns this
  page: (page = 1) ->
    if not Utils.isNaturalNumber(page) or page is 0
      throw new Error("Page '#{from}' is invalid!")

    limit = if @_config.params?.limit? then @_config.params.limit else DEFAULT_LIMIT
    offset = (page - 1) * limit

    @params({
      offset: offset
      limit: limit
    })

  # Sets search
  # query param is working like SQL LIKE. BE sets wraps around query with %, and replaces every white character
  # with %. So e.g. if query='my device', then it's searching for '%my%device%' in DB.
  #
  # @public
  # @param {string} query - Query to search for
  # @returns this
  search: (query) ->
    if typeof query isnt 'string'
      throw new Error("Search query must be a string!")

    @params({
      search: query
    })

  # Sets filter
  #
  # @public
  # @param {FilterBuilder|string} filter - Filter
  # @returns this
  filter: (filter) ->
    if typeof filter isnt 'string' or filter not instanceof FilterBuilder
      throw new Error("Filter must be a string or instance of FilterBuilder!")

    if filter instanceof FilterBuilder
      filter = filter.toString()

    @params({
      filter: filter
    })



export default APIList

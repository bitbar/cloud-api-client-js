import APIList from './APIList'


# APIListProperties
#
# @class
# @extends APIList
class APIListProperties extends APIList

  # /properties
  #
  # @constructor
  constructor: (parent) ->
    super(parent)
    @push('properties')

  # /properties/app-bans?testRunId=id
  appBan: (id) ->
    unless id?
      throw new Error('Resource ID cannot be null!')

    @push('app-bans').params({
      testRunId: id
    })



export default APIListProperties

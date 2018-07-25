import APIList from './APIList'
import APIResource from './APIResource'


# APIListRuns
#
# @class
# @extends APIList
class APIListRuns extends APIList

  # /runs
  #
  # @constructor
  constructor: (parent) ->
    super(parent)
    @push('runs')

  # /runs/config
  config: ->
    new APIResource(this).push('config')



export default APIListRuns

import APIList from './APIList'
import APIResource from './APIResource'


# APIListDevices
#
# @class
# @extends APIList
class APIListDevices extends APIList

  # /devices
  #
  # @constructor
  constructor: (parent) ->
    super(parent)
    @push('devices')

  # /devices/filters
  filters: ->
    new APIResource(this).push('filters')

  # /devices/cleanup-configurations
  cleanupConfigurations: ->
    new APIList(this).push('cleanup-configurations')

  # /devices/cleanup-configurations/{id}
  #
  # @param {number} id - Resource ID
  cleanupConfiguration: (id) ->
    unless id?
      throw new Error('Resource ID cannot be null!')

    new APIResource(this).push('cleanup-configurations', id)



export default APIListDevices

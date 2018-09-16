import APIResource from './APIResource'
import APIList from './APIList'


# APIResourceDevice
#
# @class
# @extends APIResource
class APIResourceDevice extends APIResource

  # /devices/{id}
  #
  # Constructor
  constructor: (parent, id) ->
    unless id?
      throw new Error('Resource ID cannot be null!')

    super(parent)
    @push('devices', id)

  # /devices/{id}/properties
  properties: ->
    new APIList(this).push('properties')



export default APIResourceDevice

import APIResource from './APIResource'
import APIList from './APIList'


# APIResourceBillingPeriod
#
# @class
# @extends APIResource
class APIResourceDeviceGroup extends APIResource

  # /device-groups/{id}
  #
  # Constructor
  constructor: (parent, id) ->
    unless id?
      throw new Error('Resource ID cannot be null!')

    super(parent)
    @push('device-groups', id)

  # /device-groups/{id}/devices
  devices: ->
    new APIList(this).push('devices')

  # /device-groups/{id}/device/{id}
  device: (id) ->
    unless id?
      throw new Error('Resource ID cannot be null!')

    new APIResource(this).push('devices', id)

  # /device-groups/{id}/selectors
  selectors: ->
    new APIList(this).push('selectors')

  # /device-groups/{id}/selectors/{id}
  selector: (id) ->
    unless id?
      throw new Error('Resource ID cannot be null!')

    new APIResource(this).push('selectors', id)



export default APIResourceDeviceGroup

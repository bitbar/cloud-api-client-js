import APIResource from './APIResource'
import APIPageable from './APIPageable'

import Device from './Device'

class DeviceGroup extends APIResource
  constructor: (api, parent, id) ->
    super(api, parent)
    @api.throwUnlessId(id, 'DeviceGroup')
    @pushSelector('device-groups', id)

  devices: ->
    a = new APIPageable(@api, this)
    a.pushSelector('devices')
  device: (id) ->
    new Device(@api, this, id)

  selectors: ->
    a = new APIPageable(@api, this)
    a.pushSelector('selectors')
  selector: (id) ->
    @api.throwUnlessId(id, 'DeviceGroup Selector')
    a = new APIResource(@api, this)
    a.pushSelector('selectors', id)



export default DeviceGroup

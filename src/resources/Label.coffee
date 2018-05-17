import APIResource from './APIResource'
import APIPageable from './APIPageable'

import Utils from '../Utils'

class Label extends APIResource
  constructor: (api, parent, id) ->
    super(api, parent)
    Utils.throwUnlessId(id, 'Label')
    @pushSelector('labels', id)

  devices: ->
    a = new APIPageable(@api, this)
    a.pushSelector('devices')
  device: (id) ->
    Utils.throwUnlessId(id, 'Label Device')
    a = new APIResource(@api, this)
    a.pushSelector('devices', id)



export default Label

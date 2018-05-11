import APIResource from './APIResource'
import APIPageable from './APIPageable'

class Label extends APIResource
  constructor: (api, parent, id) ->
    super(api, parent)
    @api.throwUnlessId(id, 'Label')
    @pushSelector('labels', id)

  devices: ->
    a = new APIPageable(@api, this)
    a.pushSelector('devices')
  device: (id) ->
    @api.throwUnlessId(id, 'Label Device')
    a = new APIResource(@api, this)
    a.pushSelector('devices', id)



export default Label

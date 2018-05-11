import APIResource from './APIResource'
import APIPageable from './APIPageable'

class Device extends APIResource
  constructor: (api, parent, id) ->
    super(api, parent)
    @api.throwUnlessId(id, 'Device')
    @pushSelector('devices', id)

  queue: ->
    a = new APIPageable(@api, this)
    a.pushSelector('queue')

  property: (id) ->
    @api.throwUnlessId(id, 'Device Property')
    a = new APIResource(@api, this)
    a.pushSelector('properties', id)
  properties: ->
    a = new APIPageable(@api, this)
    a.pushSelector('properties')

  label: (id) ->
    @api.throwUnlessId(id, 'Device Label')
    a = new APIResource(@api, this)
    a.pushSelector('labels', id)
  labels: ->
    a = new APIPageable(@api, this)
    a.pushSelector('labels')



export default Device

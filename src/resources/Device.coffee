import APIResource from './APIResource'
import APIPageable from './APIPageable'

import Utils from '../Utils'

class Device extends APIResource
  constructor: (api, parent, id) ->
    super(api, parent)
    Utils.throwUnlessId(id, 'Device')
    @pushSelector('devices', id)

  queue: ->
    a = new APIPageable(@api, this)
    a.pushSelector('queue')

  property: (id) ->
    Utils.throwUnlessId(id, 'Device Property')
    a = new APIResource(@api, this)
    a.pushSelector('properties', id)
  properties: ->
    a = new APIPageable(@api, this)
    a.pushSelector('properties')

  label: (id) ->
    Utils.throwUnlessId(id, 'Device Label')
    a = new APIResource(@api, this)
    a.pushSelector('labels', id)
  labels: ->
    a = new APIPageable(@api, this)
    a.pushSelector('labels')



export default Device

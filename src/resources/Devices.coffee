import APIPageable from './APIPageable'
import APIResource from './APIResource'

import { throwUnlessId } from '../Utils'

class Devices extends APIPageable
  constructor: (api, parent) ->
    super(api, parent)
    @pushSelector('devices')

  filters: ->
    a = new APIResource(@api, this)
    a.pushSelector('filters')

  cleanupConfigurations: ->
    a = new APIPageable(@api, this)
    a.pushSelector('cleanup-configurations')
  cleanupConfiguration: (id) ->
    throwUnlessId(id, 'Devices CleanupConfiguration')
    a = new APIResource(@api, this)
    a.pushSelector('cleanup-configurations', id)



export default Devices

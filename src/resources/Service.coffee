import './APIResource'
import './APIPageable'

import throwUnlessId from '../Utils'

class Service extends APIResource
  constructor: (api, parent, id) ->
    super(api, parent)
    throwUnlessId(id, 'Service')
    @pushSelector('services', id)

  activate: (data) ->
    a = new APIResource(@api, this)
    a.pushSelector('activate')
    a.post(data)

  deactivate: ->
    a = new APIResource(@api, this)
    a.pushSelector('deactivate')
    a.post()

  roles: ->
    a = new APIPageable(@api, this)
    a.pushSelector('roles')



export default Service

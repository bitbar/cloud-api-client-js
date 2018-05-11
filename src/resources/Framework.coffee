import APIResource from './APIResource'
import APIPageable from './APIPageable'

class Framework extends APIResource
  constructor: (api, parent, id) ->
    super(api, parent)
    @api.throwUnlessId(id, 'Framework')
    @pushSelector('frameworks', id)

  requiredRoles: ->
    a = new APIPageable(@api, this)
    a.pushSelector('required-roles')

  config: ->
    a = new APIResource(@api, this)
    a.pushSelector('config')



export default Framework

import APIResource from './APIResource'
import APIPageable from './APIPageable'

class Build extends APIResource
  constructor: (api, parent, id) ->
    super(api, parent)
    @api.throwUnlessId(id, 'Build')
    @pushSelector('builds', id)

  config: ->
    a = new APIResource(@api, this)
    a.pushSelector('config')



export default Build

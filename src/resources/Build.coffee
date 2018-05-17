import APIResource from './APIResource'
import APIPageable from './APIPageable'

import Utils from '../Utils'

class Build extends APIResource
  constructor: (api, parent, id) ->
    super(api, parent)
    Utils.throwUnlessId(id, 'Build')
    @pushSelector('builds', id)

  config: ->
    a = new APIResource(@api, this)
    a.pushSelector('config')



export default Build

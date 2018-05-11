import './APIResource'
import './APIPageable'

import throwUnlessId from '../Utils'

class Purchased extends APIResource
  constructor: (api, parent, id) ->
    super(api, parent)
    throwUnlessId(id, 'Purchased')
    @pushSelector('purchased', id)

  receipt: =>
    a = new APIPageable(@api, this)
    a.pushSelector('receipt')



export default Purchased

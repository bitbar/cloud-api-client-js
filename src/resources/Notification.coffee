import APIResource from './APIResource'

import { throwUnlessId } from '../Utils'

class Notification extends APIResource
  constructor: (api, parent, id) ->
    super(api, parent)
    throwUnlessId(id, 'Notification')
    @pushSelector('notifications', id)

  test: ->
    a = new APIResource(@api, this)
    a.pushSelector('test')



export default Notification

import APIResource from './APIResource'

import Utils from '../Utils'

class Notification extends APIResource
  constructor: (api, parent, id) ->
    super(api, parent)
    Utils.throwUnlessId(id, 'Notification')
    @pushSelector('notifications', id)

  test: ->
    a = new APIResource(@api, this)
    a.pushSelector('test')



export default Notification

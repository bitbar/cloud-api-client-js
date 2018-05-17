import APIResource from './APIResource'
import APIPageable from './APIPageable'

import Utils from '../Utils'

class NotificationPlan extends APIResource
  constructor: (api, parent, id) ->
    super(api, parent)
    Utils.throwUnlessId(id, 'NotificationPlan')
    @pushSelector('notification-plans', id)

  check: ->
    a = new APIPageable(@api, this)
    a.pushSelector('check')

  test: ->
    a = new APIResource(@api, this)
    a.pushSelector('test')

  execute: ->
    a = new APIResource(@api, this)
    a.pushSelector('execute')



export default NotificationPlan
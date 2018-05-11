import APIResource from './APIResource'
import APIPageable from './APIPageable'

class NotificationPlan extends APIResource
  constructor: (api, parent, id) ->
    super(api, parent)
    @api.throwUnlessId(id, 'NotificationPlan')
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

import APIResource from './APIResource'
import APIPageable from './APIPageable'

class NotificationPlans extends APIPageable
  constructor: (api, parent, id) ->
    super(api, parent)
    if id?
      @pushSelector('notification-plans', id)
    else
      @pushSelector('notification-plans')
    return

  channels: ->
    a = new APIResource(@api, this)
    a.pushSelector('channels')

  scopes: ->
    a = new APIResource(@api, this)
    a.pushSelector('scopes')



export default NotificationPlans

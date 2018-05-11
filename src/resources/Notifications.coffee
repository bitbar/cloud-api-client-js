import './APIPageable'

class Notifications extends APIPageable
  constructor: (api, parent) ->
    super(api, parent)
    @pushSelector('notifications')
    return

  scopes: ->
    a = new APIPageable(@api, this)
    a.pushSelector('scopes')

  channels: ->
    a = new APIPageable(@api, this)
    a.pushSelector('channels')



export default Notifications

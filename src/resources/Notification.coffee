import APIResource from './APIResource'

class Notification extends APIResource
  constructor: (api, parent, id) ->
    super(api, parent)
    @api.throwUnlessId(id, 'Notification')
    @pushSelector('notifications', id)

  test: ->
    a = new APIResource(@api, this)
    a.pushSelector('test')



export default Notification

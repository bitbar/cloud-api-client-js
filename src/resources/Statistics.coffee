import './APIPageable'

class Statistics extends APIPageable
  constructor: (api, parent) ->
    super(api, parent)
    @pushSelector('statistics')

  deviceSessions: ->
    a = new APIPageable(@api, this)
    a.pushSelector('device-sessions')



export default Statistics

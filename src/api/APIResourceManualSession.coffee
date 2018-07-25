import APIResourceDeviceSession from './APIResourceDeviceSession'


# APIResourceManualSession
#
# @class
# @extends APIResourceDeviceSession
class APIResourceManualSession extends APIResourceDeviceSession

  # /connections
  connections: ->
    a = new APIResource(this)
    a.push('connections')



export default APIResourceManualSession

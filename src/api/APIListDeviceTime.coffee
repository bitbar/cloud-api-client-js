import APIList from './APIList'


# APIListDeviceTime
#
# @class
# @extends APIList
class APIListDeviceTime extends APIList

  # /device-time
  #
  # @constructor
  constructor: (parent) ->
    super(parent)
    @push('device-time')

  # /device-time/reserved
  reserved: ->
    new APIList(this).push('reserved')

  # /device-time/used
  used: ->
    new APIList(this).push('used')



export default APIListDeviceTime

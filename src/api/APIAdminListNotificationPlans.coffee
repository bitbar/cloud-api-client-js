import APIList from './APIList'


# APIListNotificationPlans
#
# @class
# @extends APIList
class APIAdminListNotificationPlans extends APIList

  # /notification-plans
  #
  # Constructor
  constructor: (parent) ->
    super(parent)
    @push('notification-plans')

  # /notification-plans/channels
  channels: ->
    new APIList(this).push('channels')

  # /notification-plans/scopes
  scopes: ->
    new APIList(this).push('scopes')



export default APIAdminListNotificationPlans

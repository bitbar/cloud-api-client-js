import APIResource from './APIResource'
import APIList from './APIList'


# APIAdminResourceNotificationPlan
#
# @class
# @extends APIResource
class APIAdminResourceNotificationPlan extends APIResource

  # /notification-plans/{id}
  #
  # @constructor
  constructor: (parent, id) ->
    unless id?
      throw new Error('Resource ID cannot be null!')

    super(parent)
    @push('notification-plans', id)

  # /notification-plans/{id}/check
  check: ->
    new APIList(this).push('check')

  # /notification-plans/{id}/test
  test: ->
    new APIResource(this).push('test')

  # /notification-plans/{id}/execute
  execute: ->
    new APIResource(this).push('execute')



export default APIAdminResourceNotificationPlan

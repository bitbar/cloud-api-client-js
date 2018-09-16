import APIList from './APIList'


# APIListNotifications
#
# @class
# @extends APIList
class APIListNotifications extends APIList

  # /notifications
  # Constructor
  constructor: (parent) ->
    super(parent)
    @push('notifications')

  # /notifications/scopes
  scopes: ->
    new APIList(this).push('scopes')

  # /notifications/channels
  channels: ->
    new APIList(this).push('channels')



export default APIListNotifications

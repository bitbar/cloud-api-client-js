import APIResource from './APIResource'


# APIResourceNotification
#
# @class
# @extends APIResource
class APIResourceNotification extends APIResource

  # /notifications/{id}
  #
  # Constructor
  constructor: (parent, id) ->
    unless id?
      throw new Error('Resource ID cannot be null!')

    super(parent)
    @push('notifications', id)

  # /notifications/{id}/test
  test: ->
    new APIResource(this).push('test')



export default APIResourceNotification

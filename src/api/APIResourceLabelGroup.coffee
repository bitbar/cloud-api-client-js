import APIResource from './APIResource'
import APIList from './APIList'


# APIResourceLabelGroup
#
# @class
# @extends APIResource
class APIResourceLabelGroup extends APIResource

  # /label-groups/{id}
  #
  # Constructor
  constructor: (parent, id) ->
    unless id?
      throw new Error('Resource ID cannot be null!')

    super(parent)
    @push('label-groups', id)

  # /label-groups/{id}/labels
  labels: ->
    new APIList(this).push('labels')

  # /label-groups/{id}/label
  label: (id) ->
    new APIResource(this).push('labels', id)



export default APIResourceLabelGroup

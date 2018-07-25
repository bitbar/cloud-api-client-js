import APIResource from './APIResource'
import APIList from './APIList'


# APIAdminResourceService
#
# @class
# @extends APIResource
class APIAdminResourceService extends APIResource

  # /services/{id}
  #
  # @constructor
  constructor: (parent, id) ->
    unless id?
      throw new Error('Resource ID cannot be null!')

    super(parent)
    @push('services', id)

  # /services/{id}/activate
  activate: ->
    new APIResource(this).push('activate')

  # /services/{id}/deactivate
  deactivate: ->
    new APIResource(this).push('deactivate')

  # /services/{id}/roles
  roles: ->
    new APIList(this).push('roles')



export default APIAdminResourceService

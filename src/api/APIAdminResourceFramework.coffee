import APIResource from './APIResource'
import APIList from './APIList'


# APIAdminResourceFramework
#
# @class
# @extends APIResource
class APIAdminResourceFramework extends APIResource

  # /frameworks/{id}
  #
  # Constructor
  constructor: (parent, id) ->
    unless id?
      throw new Error('Resource ID cannot be null!')

    super(parent)
    @push('frameworks', id)

  # /frameworks/{id}/config
  config: ->
    new APIResource(this).push('config')

  # /frameworks/{id}/required-roles
  requiredRoles: ->
    new APIList(this).push('required-roles')



export default APIAdminResourceFramework

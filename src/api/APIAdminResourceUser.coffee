import APIResource from './APIResource'
import APIList from './APIList'


# APIAdminResourceUser
#
# @class
# @extends APIResource
class APIAdminResourceUser extends APIResource

  # /users/{id}
  #
  # @constructor
  constructor: (parent, id) ->
    unless id?
      throw new Error('Resource ID cannot be null!')

    super(parent)
    @push('users', id)

  # /users/{id}/account/roles
  accountRoles: ->
    new APIList(this).push('account', 'roles')

  # /users/{id}/account/roles/{id}
  accountRole: ->
    new APIResource(this).push('account', 'roles', 'id')

  # /users/{id}/account/services
  accountServices: ->
    new APIList(this).push('account', 'services')

  # /users/{id}/disable
  disable: ->
    new APIResource(this).push('disable')

  # /users/{id}/enable
  enable: ->
    new APIResource(this).push('enable')

  # /users/{id}/licenses
  licenses: ->
    new APIList(this).push('licenses')

  # /users/{id}/resend-activation
  resendActivation: ->
    new APIResource(this).push('resend-activation')

  # /users/{id}/update-account
  updateAccount: ->
    new APIResource(this).push('update-account')



export default APIAdminResourceUser

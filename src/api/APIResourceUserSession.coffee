import APIResource from './APIResource'


# APIResourceUserSession
#
# @class
# @extends APIResource
class APIResourceUserSession extends APIResource

  # @constructor
  constructor: (parent) ->
    super(parent)
    @push('user-sessions')

  # /user-sessions/login
  login: ->
    new APIResource(this).push('login')

  # /user-sessions/logout
  logout: ->
    new APIResource(this).push('logout')

  # /user-sessions/{name}-login
  sso: (name) ->
    new APIResource(this).push('user-sessions', name + '-login')



export default APIResourceUserSession

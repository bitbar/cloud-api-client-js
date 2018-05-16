import APIResource from './APIResource'
import APIPageable from './APIPageable'

class UserSession extends APIResource

  login: ->
    a = new APIPageable(@api, this)
    a.pushSelector('login')

  logout: ->
    a = new APIPageable(@api, this)
    a.pushSelector('logout')



export default UserSession

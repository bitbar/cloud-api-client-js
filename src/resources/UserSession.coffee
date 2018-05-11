import './APIResource'
import './APIPageable'

class UserSession extends APIResource

  login: ->
    a = new APIPageable(@api, this)
    a.pushSelector('login')

  logout: ->
    a = new APIPageable(@api, this)
    a.pushSelector('logout')



export default UserSession

import APIResource from './APIResource'


/**
 * APIResourceUserSession
 *
 * @class
 * @extends APIResource
 */
class APIResourceUserSession extends APIResource {

  // Constructor
  // /user-sessions
  constructor (parent: object) {
    super(parent);
    this.push('user-sessions');
  }

  // /user-sessions/login
  public login (data: object) {
    return new APIResource(this).push('login').post().data(data);
  }

  // /user-sessions/logout
  public logout () {
    return new APIResource(this).push('logout').post();
  }

  // /user-sessions/{name}-login
  public sso (name) {
    return new APIResource(this).push(name + '-login');
  }

}

export default APIResourceUserSession

import {API} from '../API';
import {APIEntity} from './APIEntity';
import {APIResource} from './APIResource'

export class APIResourceUserSession extends APIResource {

  // /user-sessions
  constructor(parent: APIEntity<any> | API) {
    super(parent);
    this.push('user-sessions');
  }

  // /user-sessions/login
  login(data: object) {
    // example of data used in cloud-fe
    // data = {
    //   username: login
    //   password: password
    // }
    return new APIResource(this).push('login').post().data(data);
  }

  // /user-sessions/logout
  logout() {
    return new APIResource(this).push('logout').post();
  }

  // /user-sessions/{name}-login
  sso(name: string) {
    return new APIResource(this).push(name + '-login');
  }

  // /user-sessions/portal-login
  portalLogin() {
    return new APIResource(this).push('portal-login').post();
  }

}

export default APIResourceUserSession

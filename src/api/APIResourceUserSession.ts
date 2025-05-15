import {API} from '../API';
import {APIResource} from './APIResource'
import {NoQueryParams} from './models/HTTP';
import {LoginData, User} from './models/User';

export class APIResourceUserSession extends APIResource {

  // /user-sessions
  constructor(parent: API) {
    super(parent);
    this.push('user-sessions');
  }

  // /user-sessions/login
  login(data: LoginData) {
    return new APIResource<User, NoQueryParams, LoginData>(this).push('login').post().data(data);
  }

  // /user-sessions/logout
  logout() {
    return new APIResource(this).push('logout').post();
  }

  // /user-sessions/oauth/authorize/{name}-login
  sso(name: string) {
    return new APIResource(this).push('oauth', 'authorize', name + '-login');
  }

  // /user-sessions/oauth/authorize/sbid-login
  sbidCallbackUrl() {
    return new APIResource(this).push('oauth', 'authorize', 'sbid-login').toUrl(true);
  }

}

export default APIResourceUserSession

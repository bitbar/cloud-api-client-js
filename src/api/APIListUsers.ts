import {Method} from 'axios';
import {API} from '../API';
import {APIList} from './APIList';
import {APIResource} from './APIResource';
import {NoQueryParams} from './models/HTTP';
import {Message} from './models/Message';
import {
  User,
  UserActivateData,
  UserData,
  UserPasswordData,
  UserRecoveryQueryParams,
} from './models/User';


export class APIListUsers extends APIList<User, NoQueryParams, UserData> {

  protected ALLOWED_HTTP_METHODS: Array<Method> = ['GET', 'POST'];

  /**
   * /users
   */
  constructor(parent: API) {
    super(parent);
    this.push('users');
  }

  // /users/activate
  activate() {
    return new APIResource<User, NoQueryParams, UserActivateData>(this).push('activate').post();
  }

  // /users/recoveries
  recoveries() {
    return new APIResource<User | Message, UserRecoveryQueryParams, UserData>(this).push('recoveries');
  }

  // /users/passwordRecovery
  passwordRecovery() {
    return new APIResource<User, NoQueryParams, UserPasswordData>(this).push('password-recovery');
  }

}

export default APIListUsers;

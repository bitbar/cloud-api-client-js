import {Method} from "axios";
import {API} from '../API';
import {APIList} from './APIList'
import {APIResource} from './APIResource'
import {QueryParams} from "./models/HTTP";
import {User} from "./models/User";
import {VatRate} from "./models/VatRate";

export type UserData = Pick<User, 'email'>;

export type UserPasswordData = {
  key: string
  password: string;
};

export type UserActivateData = {
  zip: string;
} & UserPasswordData
  & Pick<User, 'address' | 'city' | 'country' | 'email' | 'firstName' | 'lastName' | 'organization' | 'phone' | 'state' | 'vatId'>;

export interface UserRecoveryQueryParams extends QueryParams {
  recoveryKey: string;
}

export interface ValidateVatQueryParams extends QueryParams {
  countryCode: string;
  vatId: string;
}

export class APIListUsers extends APIList<User, void, UserData> {

  protected ALLOWED_HTTP_METHODS: Array<Method> = ["POST"];

  /**
   * /users
   */
  constructor(parent: API) {
    super(parent);
    this.push('users');
  }

  // /users/activate
  activate() {
    return new APIResource<User, void, UserActivateData>(this).push('activate').post();
  }

  // /users/recoveries
  recoveries() {
    return new APIResource<User, UserRecoveryQueryParams, UserData>(this).push('recoveries');
  }

  // /users/passwordRecovery
  passwordRecovery() {
    return new APIResource<User, void, UserPasswordData>(this).push('password-recovery');
  }

  // /users/resetApiKey
  validateVatId() {
    return new APIResource<VatRate, ValidateVatQueryParams, void>(this).push('validateVatId');
  }

}

export default APIListUsers;

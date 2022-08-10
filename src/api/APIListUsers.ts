import {Method} from "axios";
import {API} from '../API';
import {NoData} from "./APIEntity";
import {APIList, NoQueryParams} from './APIList'
import {APIResource} from './APIResource'
import {QueryParams} from "./models/HTTP";
import {Message} from "./models/Message";
import {User, UserData} from "./models/User";
import {VatRate} from "./models/VatRate";

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

export class APIListUsers extends APIList<User, NoQueryParams, UserData> {

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

  // /users/resetApiKey
  validateVatId() {
    return new APIResource<VatRate, ValidateVatQueryParams, NoData>(this).push('validateVatId');
  }

}

export default APIListUsers;

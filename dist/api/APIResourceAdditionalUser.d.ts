import { APIResource } from './APIResource';
import { APIUserResourceAccount } from './APIUserResourceAccount';
import { NoQueryParams } from './models/HTTP';
import { User } from './models/User';
export declare class APIResourceAdditionalUser extends APIResource<User> {
    constructor(parent: APIUserResourceAccount, id: number);
    resendActivation(): APIResource<User, NoQueryParams, void>;
}
export default APIResourceAdditionalUser;

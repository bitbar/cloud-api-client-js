import { Method } from 'axios';
import { API } from '../API';
import { APIList } from './APIList';
import { APIResource } from './APIResource';
import { NoQueryParams } from './models/HTTP';
import { Message } from './models/Message';
import { User, UserActivateData, UserData, UserPasswordData, UserRecoveryQueryParams } from './models/User';
export declare class APIListUsers extends APIList<User, NoQueryParams, UserData> {
    protected ALLOWED_HTTP_METHODS: Array<Method>;
    constructor(parent: API);
    activate(): APIResource<User, NoQueryParams, UserActivateData>;
    recoveries(): APIResource<User | Message, UserRecoveryQueryParams, UserData>;
    passwordRecovery(): APIResource<User, NoQueryParams, UserPasswordData>;
}
export default APIListUsers;

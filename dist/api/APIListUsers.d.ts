import { Method } from 'axios';
import { API } from '../API';
import { APIList } from './APIList';
import { APIResource } from './APIResource';
import { NoQueryParams } from './models/HTTP';
import { Message } from './models/Message';
import { User, UserActivateData, UserData, UserPasswordData, UserRecoveryQueryParams, ValidateVatQueryParams } from './models/User';
import { VatRate } from './models/VatRate';
export declare class APIListUsers extends APIList<User, NoQueryParams, UserData> {
    protected ALLOWED_HTTP_METHODS: Array<Method>;
    constructor(parent: API);
    activate(): APIResource<User, NoQueryParams, UserActivateData>;
    recoveries(): APIResource<User | Message, UserRecoveryQueryParams, UserData>;
    passwordRecovery(): APIResource<User, NoQueryParams, UserPasswordData>;
    validateVatId(): APIResource<VatRate, ValidateVatQueryParams, void>;
}
export default APIListUsers;

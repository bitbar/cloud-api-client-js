import { Method } from 'axios';
import { API } from '../API';
import { APIList } from './APIList';
import { APIResourceUser } from './APIResourceUser';
import { AccountService, ServicePaymentStatus } from './models/AccountService';
import { CollectionQueryParams, NoQueryParams } from './models/HTTP';
import { Service, ServiceData } from './models/Service';
export declare class APIListServices extends APIList<ServicePaymentStatus, NoQueryParams, ServiceData> {
    protected ALLOWED_HTTP_METHODS: Array<Method>;
    constructor(parent: API | APIResourceUser);
    available(): APIList<Service, CollectionQueryParams, void>;
    active(): APIList<AccountService, CollectionQueryParams, void>;
    byPrice(): APIList<AccountService, CollectionQueryParams, void>;
    availableByPrice(): APIList<AccountService, CollectionQueryParams, void>;
}
export default APIListServices;

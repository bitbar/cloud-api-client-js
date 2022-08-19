import { API } from '../API';
import { APIList } from './APIList';
import { APIResource } from './APIResource';
import { Broker } from './models/Broker';
import { NoQueryParams } from './models/HTTP';
export declare class APIResourceBroker extends APIResource {
    constructor(parent: API);
    hubs(): APIList<Broker, NoQueryParams, void>;
}
export default APIResourceBroker;

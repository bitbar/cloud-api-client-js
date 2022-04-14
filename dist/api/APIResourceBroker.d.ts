import APIResource from './APIResource';
import APIList from './APIList';
declare class APIResourceBroker extends APIResource {
    constructor(parent: object);
    hubs(): APIList;
}
export default APIResourceBroker;

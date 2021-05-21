import APIResource from './APIResource';
import APIList from './APIList';
declare class APIResourceCleanupConfiguration extends APIResource {
    constructor(parent: object, id: number);
    devices(): APIList;
}
export default APIResourceCleanupConfiguration;

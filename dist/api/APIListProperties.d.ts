import { API } from '../API';
import { APIList } from './APIList';
import { CollectionQueryParams } from './models/HTTP';
import { Property, PropertyData } from './models/Property';
export declare class APIListProperties extends APIList<Property, CollectionQueryParams, PropertyData> {
    constructor(parent: API);
    maintenance(): APIList<any, CollectionQueryParams, any>;
}
export default APIListProperties;

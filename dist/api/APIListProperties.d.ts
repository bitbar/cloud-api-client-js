import { API } from '../API';
import { APIList } from './APIList';
import { CollectionQueryParams } from './models/HTTP';
import { AppBansQueryParams, Property, PropertyData } from './models/Property';
export declare class APIListProperties extends APIList<Property, CollectionQueryParams, PropertyData> {
    constructor(parent: API);
    appBan(id: number): APIList<Property, AppBansQueryParams, AppBansQueryParams>;
    maintenance(): APIList<any, CollectionQueryParams, any>;
}
export default APIListProperties;

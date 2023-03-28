import CloudAPIClient from './CloudAPIClient';
import { APIResource as OriginAPIResource } from './api/APIResource';
import { APIList as OriginAPIList } from './api/APIList';
export * from './models';
export * from './api/class';
export * from './CloudAPIClient';
export declare type APIResource = InstanceType<typeof OriginAPIResource>;
export declare type APIList = InstanceType<typeof OriginAPIList>;
export default CloudAPIClient;

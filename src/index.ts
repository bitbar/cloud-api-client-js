import CloudAPIClient from './CloudAPIClient';
import {APIResource as OriginAPIResource} from './api/APIResource';
import {APIList as OriginAPIList} from'./api/APIList';
import {APIEntity as OriginAPIEntity} from'./api/APIEntity';

export * from './models';
export * from './api/class';
export * from './CloudAPIClient';

export type APIEntity = InstanceType<typeof OriginAPIEntity>;
export type APIResource = InstanceType<typeof OriginAPIResource>;
export type APIList = InstanceType<typeof OriginAPIList>;


export default CloudAPIClient;

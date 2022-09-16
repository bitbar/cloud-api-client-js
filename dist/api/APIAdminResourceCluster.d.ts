import { API } from '../API';
import { APIAdminResource } from './APIAdminResource';
import { APIList } from './APIList';
import { APIResource } from './APIResource';
import { AdminDevice } from './models/AdminDevice';
import { Cluster, ClusterData, ClusterParams } from './models/Cluster';
export declare class APIAdminResourceCluster extends APIResource<Cluster, ClusterParams, ClusterData> {
    constructor(parent: API | APIAdminResource, id: number);
    devices(): APIList<AdminDevice, import("..").CollectionQueryParams, any>;
}
export default APIAdminResourceCluster;

import {API} from '../API';
import {APIAdminResource} from './APIAdminResource';
import {APIList} from './APIList'
import {APIResource} from './APIResource'
import {AdminDevice} from './models/AdminDevice';
import {Cluster, ClusterData, ClusterParams} from './models/Cluster';


export class APIAdminResourceCluster extends APIResource<Cluster, ClusterParams, ClusterData> {

  /**
   * /clusters/{id}
   */
  constructor(parent: API | APIAdminResource, id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    super(parent);
    this.push('clusters', id);
  }

  // /clusters/{id}/devices
  devices() {
    return new APIList<AdminDevice>(this).push('devices');
  }

}

export default APIAdminResourceCluster

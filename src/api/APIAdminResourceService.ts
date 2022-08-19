import {APIAdminResource} from './APIAdminResource';
import {NoData} from './APIEntity';
import {APIResource} from './APIResource'
import {NoQueryParams} from './models/HTTP';
import {Service, ServiceActivateData} from './models/Service';


export class APIAdminResourceService extends APIResource<Service, NoQueryParams, NoData> {

  /**
   * /services/{id}
   */
  constructor(parent: APIAdminResource, id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    super(parent);
    this.push('admin', 'services', id);
  }

  // /services/{id}/activate
  activate() {
    return new APIResource<Service, ServiceActivateData>(this).push('activate').post();
  }

}

export default APIAdminResourceService

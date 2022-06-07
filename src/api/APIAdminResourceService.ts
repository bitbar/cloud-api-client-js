import APIAdminResource from "./APIAdminResource";
import {APIResource} from './APIResource'
import {Service} from "./models/Service";


export class APIAdminResourceService extends APIResource<Service> {

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
    return new APIResource<Service>(this).push('activate').post();
  }

}

export default APIAdminResourceService

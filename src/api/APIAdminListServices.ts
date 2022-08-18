import {APIAdminResource} from './APIAdminResource';
import {APIList} from './APIList'
import {AdminServicesParams, Service} from './models/Service';


export class APIAdminListServices extends APIList<Service, AdminServicesParams, Service> {

  /**
   * /admin/services
   */
  constructor(parent: APIAdminResource) {
    super(parent);
    this.push('admin', 'services');
  }

  active() {
    const apiList = new APIList<Service, AdminServicesParams, Service>(this);
    apiList.params<'notArchived'>({
      notArchived: true
    });
    return apiList;
  }

  activated() {
    const apiList = this.active();
    apiList.params<'filter' | 'limit' | 'sort'>({
      filter: 'activated_eq_true',
      limit: 0,
      sort: 'name_a'
    })
    return apiList;
  }

  inUse() {
    const apiList = new APIList<Service, AdminServicesParams, Service>(this);
    apiList.params<'inUse' | 'limit' | 'sort'>({
      inUse: true,
      limit: 0,
      sort: 'name_a'
    })
    return apiList;
  }

  byPrice() {
    const apiList = new APIList<Service, AdminServicesParams, Service>(this);
    apiList.params<'sort'>({
      sort: 'centPrice_a'
    })
    return apiList;
  }

}

export default APIAdminListServices;

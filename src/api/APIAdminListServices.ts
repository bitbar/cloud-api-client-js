import APIAdminResource from "./APIAdminResource";
import {APIList} from './APIList'
import {Service} from "./models/Service";


export class APIAdminListServices extends APIList<Service> {

  /**
   * /admin/services
   */
  constructor(parent: APIAdminResource) {
    super(parent);
    this.push('admin', 'services');
  }

  // /services/available
  available() {
    return new APIList<Service>(this).push('available');
  }

  active() {
    const a = new APIList<Service>(this);
    a.params<'notArchived'>({
      notArchived: true
    });
    return a;
  }

  activated() {
    const a = this.active();
    a.params<'filter' | 'limit' | 'sort'>({
      filter: 'activated_eq_true',
      limit: 0,
      sort: 'name_a'
    })
    return a;
  }

  inUse() {
    const a = new APIList<Service>(this);
    a.params<'inUse' | 'limit' | 'sort'>({
      inUse: true,
      limit: 0,
      sort: 'name_a'
    })
    return a;
  }

  byPrice() {
    const a = new APIList<Service>(this);
    a.params<'sort'>({
      sort: 'centPrice_a'
    })
    return a;
  }

}

export default APIAdminListServices;

import APIAdminResource from "./APIAdminResource";
import {APIList} from './APIList'
import {APIResource} from './APIResource'
import {Framework} from "./models/Framework";
import {ProjectJobConfig} from "./models/ProjectJobConfig";
import {Role} from "./models/Role";

export class APIAdminResourceFramework extends APIResource<Framework> {

  /**
   * /admin/frameworks/{id}
   */
  constructor(parent: APIAdminResource, id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    super(parent);
    this.push('admin', 'frameworks', id);
  }

  // /admin/frameworks/{id}/config
  config() {
    return new APIResource<ProjectJobConfig>(this).push('config');
  }

  // /admin/frameworks/{id}/required-roles
  requiredRoles() {
    return new APIList<Role>(this).push('required-roles');
  }

}

export default APIAdminResourceFramework

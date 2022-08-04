import {APIAdminResource} from "./APIAdminResource";
import {APIList, NoQueryParams} from './APIList'
import {APIResource} from './APIResource'
import {Framework, FrameworkConfigData, FrameworkEditData} from "./models/Framework";
import {ProjectJobConfig} from "./models/ProjectJobConfig";
import {Role} from "./models/Role";

export class APIAdminResourceFramework extends APIResource<Framework, NoQueryParams, FrameworkEditData> {

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
    return new APIResource<ProjectJobConfig, NoQueryParams, FrameworkConfigData>(this).push('config');
  }

  // /admin/frameworks/{id}/required-roles
  requiredRoles() {
    return new APIList<Role>(this).push('required-roles');
  }

}

export default APIAdminResourceFramework

import APIAdminResource from "./APIAdminResource";
import {APIResource} from './APIResource'
import {License} from "./models/License";

export class APIAdminResourceLicense extends APIResource<License> {

  /**
   * /licenses/{id}
   */
  constructor(parent: APIAdminResource, id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    super(parent);
    this.push('admin', 'licenses', id);
  }

  // /licenses/{id}/activate
  activate() {
    return new APIResource<License>(this).push('activate');
  }

  // /licenses/{id}/deactivate
  deactivate() {
    return new APIResource<License>(this).push('deactivate');
  }

  // /licenses/{id}/resend
  resend() {
    return new APIResource<License>(this).push('resend');
  }

  // /licenses/{id}/download
  download() {
    return new APIResource<Blob>(this).push('download');
  }

}

export default APIAdminResourceLicense

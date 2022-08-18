import {APIAdminResource} from './APIAdminResource';
import {NoData} from './APIEntity';
import {APIResource} from './APIResource'
import {NoQueryParams} from './models/HTTP';
import {License} from './models/License';

export class APIAdminResourceLicense extends APIResource<License, NoQueryParams, NoData> {

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
    return new APIResource<License, NoQueryParams, NoData>(this).push('activate');
  }

  // /licenses/{id}/deactivate
  deactivate() {
    return new APIResource<License, NoQueryParams, NoData>(this).push('deactivate');
  }

  // /licenses/{id}/resend
  resend() {
    return new APIResource<License, NoQueryParams, NoData>(this).push('resend');
  }

  // /licenses/{id}/download
  download() {
    return new APIResource<Blob, NoQueryParams, NoData>(this).push('download');
  }

}

export default APIAdminResourceLicense

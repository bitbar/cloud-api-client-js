import {API} from '../API';
import {APIEntity} from './APIEntity';
import {APIResource} from './APIResource'

/**
 * APIAdminResourceLicense
 *
 * @class
 * @extends APIResource
 */
export class APIAdminResourceLicense extends APIResource {

  /**
   * /licenses/{id}
   *
   * Constructor
   */
  constructor (parent: APIEntity<any> | API, id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    super(parent);
    this.push('admin', 'licenses', id);
  }

  // /licenses/{id}/activate
  public activate () {
    return new APIResource(this).push('activate');
  }

  // /licenses/{id}/deactivate
  public deactivate () {
    return new APIResource(this).push('deactivate');
  }

  // /licenses/{id}/resend
  public resend () {
    return new APIResource(this).push('resend');
  }

  // /licenses/{id}/download
  public download () {
    return new APIResource(this).push('download');
  }

}

export default APIAdminResourceLicense

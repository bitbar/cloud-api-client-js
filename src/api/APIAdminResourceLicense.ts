import APIResource from './APIResource'
import APIList from './APIList'


/**
 * APIAdminResourceLicense
 *
 * @class
 * @extends APIResource
 */
class APIAdminResourceLicense extends APIResource {

  /**
   * /licenses/{id}
   *
   * Constructor
   */
  constructor (parent: object, id: number) {
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

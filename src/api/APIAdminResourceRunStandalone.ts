import APIResource from './APIResource'
import postDeviceRunIds from './factory/postDeviceRunIds';


/**
 * APIAdminResourceRun
 *
 * @class
 * @extends APIResourceRun
 */
class APIAdminResourceRunStandalone extends APIResource {

  /**
   * /runs/{id}
   *
   * Constructor
   */
   constructor (parent: object, id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    super(parent);
    this.push('admin', 'runs', id);
  }

  // /runs/{id}/abort
  public abort () {
    return new APIResource(this).push('abort').post();
  }  

  // /runs/{id}/changebillable
  public changeBillable (billable: boolean) {
    return new APIResource(this).push('changebillable').post().params({
      billable
    });
  }

  // /runs/{id}/changepriority
  public changePriority (priority: boolean) {
    return new APIResource(this).push('changepriority').post().params({
      priority
    });
  }

  // /runs/{id}/retry
  public retry (ids?: Array<number>) {
    return postDeviceRunIds(this, 'retry', ids).setRequestConfig({
      timeout: 0
    });
  }

}

export default APIAdminResourceRunStandalone

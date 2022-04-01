import {API} from "../API";
import {APIEntity} from './APIEntity';
import {APIList} from './APIList';
import {APIResource} from './APIResource'
import {APIResourceDeviceSessionCommon} from './APIResourceDeviceSessionCommon';
import {postDeviceRunIds} from './factory/postDeviceRunIds';


/**
 * APIAdminResourceRun
 *
 * @class
 * @extends APIResourceRun
 */
export class APIAdminResourceRunStandalone extends APIResource<any> {

  /**
   * /runs/{id}
   *
   * Constructor
   */
   constructor (parent: APIEntity<any> | API, id: number) {
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

  // /runs/{id}/device-sessions
  public deviceSessions () {
    return new APIList(this).shift().push('device-sessions');
  }

  // /runs/{id}/device-sessions/{id}
  public deviceSession (id: number) {
    return new APIResourceDeviceSessionCommon(this, id).shift();
  }

}

export default APIAdminResourceRunStandalone

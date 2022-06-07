import APIAdminResource from "./APIAdminResource";
import {APIList} from './APIList';
import {APIResource} from './APIResource'
import {APIResourceDeviceSessionCommon} from './APIResourceDeviceSessionCommon';
import {postDeviceRunIds} from './factory/postDeviceRunIds';
import {AdminTestRun} from "./models/AdminTestRun";
import {DeviceSession} from "./models/DeviceSession";


export class APIAdminResourceRunStandalone extends APIResource<AdminTestRun> {

  /**
   * /runs/{id}
   */
  constructor(parent: APIAdminResource, id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    super(parent);
    this.push('admin', 'runs', id);
  }

  // /runs/{id}/abort
  abort() {
    return new APIResource<AdminTestRun>(this).push('abort').post();
  }

  // /runs/{id}/changebillable
  changeBillable(billable: boolean) {
    return new APIResource<AdminTestRun>(this).push('changebillable').post().params({
      billable
    });
  }

  // /runs/{id}/changepriority
  changePriority(priority: boolean) {
    return new APIResource<AdminTestRun>(this).push('changepriority').post().params({
      priority
    });
  }

  // /runs/{id}/retry
  retry(ids?: Array<number>) {
    return postDeviceRunIds<AdminTestRun>(this, 'retry', ids).setRequestConfig({
      timeout: 0
    });
  }

  // /runs/{id}/device-sessions
  deviceSessions() {
    return new APIList<DeviceSession>(this).shift().push('device-sessions');
  }

  // /runs/{id}/device-sessions/{id}
  deviceSession(id: number) {
    return new APIResourceDeviceSessionCommon(this, id).shift();
  }

}

export default APIAdminResourceRunStandalone

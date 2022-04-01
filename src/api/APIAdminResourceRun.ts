import {APIAdminResourceDeviceSession} from './APIAdminResourceDeviceSession';
import {APIResourceRunCommon} from './APIResourceRunCommon'
import {postDeviceRunIds} from './factory/postDeviceRunIds';


/**
 * APIAdminResourceRun
 *
 * @class
 * @extends APIResourceRun
 */
export class APIAdminResourceRun extends APIResourceRunCommon {

  // /runs/{id}/build-logs.zip
  public buildLogsZip (ids?: Array<number>) {
    return postDeviceRunIds(this, 'build-logs.zip', ids);
  }

  // /runs/{id}/device-sessions/{id}
  public deviceSession (id: number) {
    return new APIAdminResourceDeviceSession(this, id);
  }

}

export default APIAdminResourceRun

import {APIAdminResourceDeviceSession} from './APIAdminResourceDeviceSession';
import {APIResourceRunCommon} from './APIResourceRunCommon'
import {postDeviceRunIds} from './factory/postDeviceRunIds';
import {UserFile} from "./models/UserFile";


export class APIAdminResourceRun extends APIResourceRunCommon {

  // /runs/{id}/build-logs.zip
  buildLogsZip(ids?: Array<number>) {
    return postDeviceRunIds<UserFile>(this, 'build-logs.zip', ids);
  }

  // /runs/{id}/device-sessions/{id}
  deviceSession(id: number) {
    return new APIAdminResourceDeviceSession(this, id);
  }

}

export default APIAdminResourceRun

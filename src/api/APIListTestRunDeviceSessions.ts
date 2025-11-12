import {DeviceSession} from './models/DeviceSession';
import {CollectionBasicQueryParams, NoData} from './models/HTTP';
import APIList from './APIList';
import APIResourceRunCommon from './APIResourceRunCommon';


export class APIListTestRunDeviceSessions extends APIList<DeviceSession, CollectionBasicQueryParams, NoData> {

  /**
   * device-sessions
   */
  constructor(parent: APIResourceRunCommon) {
    super(parent);
    this.push('device-sessions');
  }
}

export default APIListTestRunDeviceSessions

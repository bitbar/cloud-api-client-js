import {API} from '../API';
import {APIEntity} from './APIEntity';
import {APIList} from './APIList'
import {APIResource} from './APIResource'
import {postDeviceRunIds} from './factory/postDeviceRunIds';
import {AdminTestRun} from './models/AdminTestRun';
import {DeviceSessionStep} from './models/DeviceSession';
import {CollectionBasicQueryParams, NoData, NoQueryParams} from './models/HTTP';
import {RunData, RunQueryParam, TestRun, TestRunData} from './models/TestRun';
import {TestRunDataAvailability, TestRunDataAvailabilityQueryParams} from './models/TestRunDataAvailability';
import {UserFile} from './models/UserFile';
import APIListTestRunDeviceSessions from './APIListTestRunDeviceSessions';


export class APIResourceRunCommon extends APIResource<TestRun, RunQueryParam, TestRunData | RunData> {

  /**
   * /runs/{id}
   */
  constructor(parent: APIEntity<any> | API, id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    super(parent);
    this.push('runs', id);
  }

  // /runs/{id}/abort
  abort() {
    return new APIResource<AdminTestRun | TestRun, NoQueryParams, RunData>(this).push('abort').post();
  }

  // /runs/{id}/build-logs.zip
  buildLogsZip(ids?: Array<number>) {
    return postDeviceRunIds<UserFile>(this, 'build-logs.zip', ids);
  }

  // /runs/{id}/data-availability
  dataAvailability() {
    return new APIResource<TestRunDataAvailability, TestRunDataAvailabilityQueryParams, NoData>(this).push('data-availability');
  }

  // /runs/{id}/device-sessions
  deviceSessions() {
    return new APIListTestRunDeviceSessions(this);
  }

  // /runs/{id}/files.zip
  filesZip(ids?: Array<number>) {
    return postDeviceRunIds<UserFile>(this, 'files.zip', ids);
  }

  // /runs/{id}/logs.zip
  logsZip(ids?: Array<number>) {
    return postDeviceRunIds<UserFile>(this, 'logs.zip', ids);
  }

  // /runs/{id}/performance.zip
  performanceZip(ids?: Array<number>) {
    return postDeviceRunIds<UserFile>(this, 'performance.zip', ids);
  }

  // /runs/{id}/retry
  retry(ids?: Array<number>) {
    return postDeviceRunIds<TestRun>(this, 'retry', ids).setRequestConfig({
      timeout: 0
    });
  }

  // /runs/{id}/screenshots.zip
  screenshotsZip(ids?: Array<number>) {
    return postDeviceRunIds<UserFile>(this, 'screenshots.zip', ids);
  }

  // /runs/{id}/steps
  steps() {
    return new APIList<DeviceSessionStep, CollectionBasicQueryParams, NoData>(this).push('steps');
  }

}

export default APIResourceRunCommon

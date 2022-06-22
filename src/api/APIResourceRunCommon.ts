import {API} from '../API';
import {APIEntity} from './APIEntity';
import {APIList, NoQueryParams} from './APIList'
import {APIResource} from './APIResource'
import {postDeviceRunIds} from './factory/postDeviceRunIds';
import {DeviceSession, DeviceSessionStep} from './models/DeviceSession';
import {QueryParams} from './models/HTTP';
import {Screenshot, ScreenshotExtended} from './models/Screenshot';
import {Tag} from './models/Tag';
import {TestRun} from './models/TestRun';
import {TestRunDataAvailability} from './models/TestRunDataAvailability';
import {UserFile} from './models/UserFile';

export interface TestRunData extends QueryParams {
  displayName: string;
}

export interface RunData extends TestRunData {
  prjectId: number;
}

export interface RunQueryParam extends QueryParams {
  projectId: number;
}

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
    return new APIResource(this).push('abort').post();
  }

  // /runs/{id}/data-availability
  dataAvailability() {
    return new APIResource<TestRunDataAvailability>(this).push('data-availability');
  }

  // /runs/{id}/device-sessions
  deviceSessions() {
    return new APIList<DeviceSession>(this).push('device-sessions');
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

  // /runs/{id}/screenshot-names
  screenshotNames() {
    return new APIList<Screenshot>(this).push('screenshot-names');
  }

  // /runs/{id}/screenshots
  screenshots() {
    return new APIList<ScreenshotExtended>(this).push('screenshots');
  }

  // /runs/{id}/screenshots.zip
  screenshotsZip(ids?: Array<number>) {
    return postDeviceRunIds<UserFile>(this, 'screenshots.zip', ids);
  }

  // /runs/{id}/steps
  steps() {
    return new APIList<DeviceSessionStep>(this).push('steps');
  }

  // /runs/{id}/tags
  tags() {
    return new APIList<Tag>(this).push('tags');
  }

  // /runs/{id}/tag
  tag(id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    return new APIResource<Tag>(this).push('tags', id);
  }

}

export default APIResourceRunCommon

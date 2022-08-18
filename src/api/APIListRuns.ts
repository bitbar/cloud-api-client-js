import {APIList} from './APIList'
import {APIResource} from './APIResource'
import {APIResourceUser} from './APIResourceUser';
import {CollectionBasicQueryParams, NoQueryParams} from './models/HTTP';
import {TestRun, TestRunConfig} from './models/TestRun';

export interface TestRunData {
  configuration: TestRunConfig;
}

export interface TestRunConfigData extends TestRunData {
  includeDeviceGroups: boolean;
  includeDevices: boolean;
  includeFrameworks: boolean;
}

// for users/{userid}/runs
export interface TestRunQueryParams extends CollectionBasicQueryParams {
  forWholeAccount: boolean;
  skipCommonProject: boolean;
  skipShared: boolean;
}


export class APIListRuns extends APIList<TestRun, TestRunQueryParams, TestRunData> {

  /**
   * /runs
   */
  constructor(parent: APIResourceUser) {
    super(parent);
    this.push('runs');
  }

  // /runs/config
  config() {
    return new APIResource<TestRunConfig, NoQueryParams, TestRunConfigData>(this).push('config');
  }

}

export default APIListRuns

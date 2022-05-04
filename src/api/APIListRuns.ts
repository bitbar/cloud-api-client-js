import {APIList, CollectionQueryParams} from './APIList'
import {APIResource} from './APIResource'
import APIResourceUser from "./APIResourceUser";
import {TestRun, TestRunConfig} from "./models/TestRun";

export interface TestRunData {
  configuration: TestRunConfig;
}

export interface TestRunConfigData extends TestRunData{
  includeDeviceGroups: boolean;
  includeDevices: boolean;
  includeFrameworks: boolean;
}

export interface TestRunQueryParams extends CollectionQueryParams {
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
    return new APIResource<TestRunConfig, void, TestRunConfigData>(this).push('config');
  }

}

export default APIListRuns

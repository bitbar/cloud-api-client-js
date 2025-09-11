import {APIList} from './APIList';
import {APIResource} from './APIResource';
import {APIResourceUser} from './APIResourceUser';
import {
  RunsConfigParams,
  TestRun,
  TestRunConfig,
  TestRunsQueryParams
} from './models/TestRun';


export class APIListRuns extends APIList<TestRun, TestRunsQueryParams, TestRunConfig> {

  /**
   * /runs
   */
  constructor(parent: APIResourceUser) {
    super(parent);
    this.push('runs');
  }

  // /runs/config
  config() {
    return new APIResource<TestRunConfig, RunsConfigParams, TestRunConfig>(this).push('config');
  }

}

export default APIListRuns

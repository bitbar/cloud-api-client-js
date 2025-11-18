import {NoData} from './models/HTTP';
import {TestCaseRun} from './models/TestCaseRun';
import APIList, {APIListQuery} from './APIList';
import {SessionQueryParams} from './models/DeviceSession';
import APIResourceDeviceSessionCommon from './APIResourceDeviceSessionCommon';


export class APIListTestCaseRuns<Q extends APIListQuery = SessionQueryParams> extends APIList<TestCaseRun, Q, NoData> {

  /**
   * /test-case-runs
   */
  constructor(parent: APIResourceDeviceSessionCommon) {
    super(parent);
    this.push('test-case-runs');
  }
}

export default APIListTestCaseRuns

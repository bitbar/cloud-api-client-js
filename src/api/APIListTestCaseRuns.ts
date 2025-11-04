import {SessionQueryParams} from './models/DeviceSession';
import {CollectionBasicQueryParams, NoData, NoQueryParams} from './models/HTTP';
import APIList from './APIList';
import APIResourceDeviceSessionCommon from './APIResourceDeviceSessionCommon';
import {TestCaseRun} from './models/TestCaseRun';


export class APIListTestCaseRuns extends APIList<TestCaseRun, SessionQueryParams | CollectionBasicQueryParams | NoQueryParams, NoData> {

  /**
   * /test-case-runs
   */
  constructor(parent: APIResourceDeviceSessionCommon) {
    super(parent);
    this.push('test-case-runs');
  }
}

export default APIListTestCaseRuns

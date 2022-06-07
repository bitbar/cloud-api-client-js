import APIAdminResource from "./APIAdminResource";
import {APIList, NoQueryParams} from './APIList'
import {APIResource} from './APIResource';
import {AdminTestRun} from "./models/AdminTestRun";
import {TestRunConfig} from "./models/TestRun";


export class APIAdminListRuns extends APIList<AdminTestRun> {

  /**
   * /admin/runs
   */
  constructor(parent: APIAdminResource) {
    super(parent);
    this.push('admin', 'runs');
  }

  // /runs/config
  config() {
    const a = new APIResource<TestRunConfig, NoQueryParams, {configuration: TestRunConfig}>(this);
    a.restack('runs', 'config');
    return a;
  }

}


export default APIAdminListRuns

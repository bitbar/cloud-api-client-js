import {Method} from 'axios';
import {APIAdminResource} from './APIAdminResource';
import {APIList} from './APIList'
import {APIResource} from './APIResource';
import {AdminTestRun, RunsConfigParams} from './models/AdminTestRun';
import {TestRunConfig} from './models/TestRun';

export class APIAdminListRuns extends APIList<AdminTestRun> {

  protected ALLOWED_HTTP_METHODS: Array<Method> = ['GET'];

  /**
   * /admin/runs
   */
  constructor(parent: APIAdminResource) {
    super(parent);
    this.push('admin', 'runs');
  }

  // /runs/config
  config() {
    const apiResource = new APIResource<TestRunConfig, RunsConfigParams, {configuration: TestRunConfig}>(this);
    apiResource.restack('runs', 'config');
    return apiResource;
  }

}


export default APIAdminListRuns

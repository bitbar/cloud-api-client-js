import {Method} from 'axios';
import {APIAdminResource} from './APIAdminResource';
import {APIList} from './APIList'
import {APIResource} from './APIResource';
import {AdminTestRun} from './models/AdminTestRun';
import {RunsConfigParams, TestRunConfig} from './models/TestRun';

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
    const apiResource = new APIResource<TestRunConfig, RunsConfigParams, TestRunConfig>(this);
    apiResource.restack('runs', 'config');
    return apiResource;
  }

}


export default APIAdminListRuns

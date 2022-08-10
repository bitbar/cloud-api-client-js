import {APIAdminResource} from './APIAdminResource';
import {NoData} from './APIEntity';
import {APIList, CollectionBasicQueryParams} from './APIList'
import {APIResource} from './APIResource'
import {APIResourceRun} from './APIResourceRun'
import {APIResourceUser} from './APIResourceUser';
import {Project} from './models/Project';
import {TestRun} from './models/TestRun';
export class APIResourceProject extends APIResource<Project> {

  /**
   * /projects/{id}
   */
  constructor(parent: APIAdminResource | APIResourceUser, id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    super(parent);
    this.push('projects', id);
  }

  // /projects/{id}/runs
  runs() {
    return new APIList<TestRun, CollectionBasicQueryParams, NoData>(this).push('runs');
  }

  // /projects/{id}/runs/{id}
  run(id: number) {
    return new APIResourceRun(this, id);
  }

  // /projects/{id}/files
  files() {
    return new APIList(this).push('files');
  }

  // /projects/{id}/files.zip
  // is it /projects/{projectid}/runs/{runid}/files?
  filesZip() {
    return new APIResource(this).push('files.zip');
  }

}

export default APIResourceProject

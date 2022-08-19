import {API} from '../API';
import {APIAdminResource} from './APIAdminResource';
import {APIList} from './APIList'
import {APIResource} from './APIResource'
import {APIResourceRun} from './APIResourceRun'
import {APIResourceUser} from './APIResourceUser';
import {CollectionBasicQueryParams, NoData} from './models/HTTP';
import {Project} from './models/Project';
import {TestRun} from './models/TestRun';

export class APIResourceProject extends APIResource<Project> {

  /**
   * /projects/{id}
   */
  constructor(parent: API | APIAdminResource | APIResourceUser, id: number) {
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

}

export default APIResourceProject

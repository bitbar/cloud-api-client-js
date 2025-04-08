import {API} from '../API';
import {APIAdminResource} from './APIAdminResource';
import {APIList} from './APIList'
import {APIResource} from './APIResource'
import {APIResourceRun} from './APIResourceRun'
import {APIResourceUser} from './APIResourceUser';
import {CollectionBasicQueryParams, NoData, NoQueryParams} from './models/HTTP';
import {Project} from './models/Project';
import {ShareData, SharedResource} from './models/SharedResource';
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

  share() {
    return new APIList<SharedResource, ShareData, ShareData>(this).push('share');
  }

  // /unarchive
  unarchive() {
    return new APIResource<void, NoQueryParams, NoData>(this).push('unarchive');
  }

}

export default APIResourceProject

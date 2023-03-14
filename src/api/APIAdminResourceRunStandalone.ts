import {APIAdminResource} from './APIAdminResource';
import {APIResource} from './APIResource'
import {postDeviceRunIds} from './factory/postDeviceRunIds';
import {AdminTestRun, RunChangeBillableParams, RunChangePriorityParams} from './models/AdminTestRun';
import {NoData, NoQueryParams} from './models/HTTP';


export class APIAdminResourceRunStandalone extends APIResource<AdminTestRun, NoQueryParams, NoData> {

  /**
   * /runs/{id}
   */
  constructor(parent: APIAdminResource, id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    super(parent);
    this.push('admin', 'runs', id);
  }

  // /runs/{id}/abort
  abort() {
    return new APIResource<AdminTestRun, NoQueryParams, NoData>(this).push('abort').post();
  }

  // /runs/{id}/changebillable
  changeBillable(billable: boolean) {
    return new APIResource<AdminTestRun, RunChangeBillableParams>(this).push('changebillable').post().params({
      billable
    });
  }

  // /runs/{id}/changepriority
  changePriority(priority?: number) {
    const resource = new APIResource<AdminTestRun, RunChangePriorityParams>(this).push('changepriority');
    if (priority) {
      resource.post().data({
        priority
      });
    }
    return resource;
  }

  // /admin/runs/{id}/retry
  retry(ids?: Array<number>) {
    return postDeviceRunIds<AdminTestRun>(this, 'retry', ids).setRequestConfig({
      timeout: 0
    });
  }

}

export default APIAdminResourceRunStandalone;

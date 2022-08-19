
import {APIResource} from './APIResource'
import {APIResourceProject} from './APIResourceProject'
import {NoData, NoQueryParams} from './models/HTTP';


export class APIAdminResourceProject extends APIResourceProject {

  // /unarchive
  unarchive() {
    return new APIResource<void, NoQueryParams, NoData>(this).push('unarchive');
  }

}

export default APIAdminResourceProject

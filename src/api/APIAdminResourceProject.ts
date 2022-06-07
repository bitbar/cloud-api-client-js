import {NoData} from "./APIEntity";
import {NoQueryParams} from "./APIList";
import {APIResource} from './APIResource'
import {APIResourceProject} from './APIResourceProject'


export class APIAdminResourceProject extends APIResourceProject {

  // /unarchive
  unarchive() {
    return new APIResource<void, NoQueryParams, NoData>(this).push('unarchive');
  }

}

export default APIAdminResourceProject

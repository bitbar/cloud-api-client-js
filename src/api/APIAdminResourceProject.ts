import {APIResource} from './APIResource'
import {APIResourceProject} from './APIResourceProject'


export class APIAdminResourceProject extends APIResourceProject {

  // /unarchive
  unarchive () {
    return new APIResource<void>(this).push('unarchive');
  }

}

export default APIAdminResourceProject

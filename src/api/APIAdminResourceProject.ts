import APIResource from './APIResource'
import APIResourceProject from './APIResourceProject'


/**
 * APIAdminResourceProject
 *
 * @class
 * @extends APIResourceProject
 */
class APIAdminResourceProject extends APIResourceProject {

  // /unarchive
  public unarchive () {
    return new APIResource(this).push('unarchive');
  }

}

export default APIAdminResourceProject

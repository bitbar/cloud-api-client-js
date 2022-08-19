import {API} from '../API';
import {APIAdminResource} from './APIAdminResource';
import {APIList} from './APIList'
import {APIResource} from './APIResource'
import {APIResourceUser} from './APIResourceUser';
import {DeviceGroupShareData} from './models/DeviceGroup';
import {CollectionBasicQueryParams, NoData} from './models/HTTP';
import {SharedResource} from './models/SharedResource';
import {FileSizeData, UserFile, UserFileTag} from './models/UserFile';


export class APIResourceFile extends APIResource<UserFile> {

  /**
   * /files/{id}
   */
  constructor(parent: API | APIAdminResource | APIResourceUser, id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    super(parent);
    this.push('files', id);
  }

  // use this to download file content
  // /files/{id}/file
  file() {
    return new APIResource<UserFile, FileSizeData, NoData>(this).push('file');
  }

  // /files/{id}/icon
  icon() {
    return new APIResource(this).push('icon');
  }

  // /files/{id}/tags
  tags() {
    return new APIList<UserFileTag, CollectionBasicQueryParams, NoData>(this).push('tags');
  }

  share() {
    return new APIList<SharedResource, DeviceGroupShareData>(this).push('share');
  }

}

export default APIResourceFile

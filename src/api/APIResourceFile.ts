import {API} from '../API';
import {APIAdminResource} from './APIAdminResource';
import {APIList} from './APIList'
import {APIResource} from './APIResource'
import {APIResourceUser} from './APIResourceUser';
import {CollectionBasicQueryParams, NoData} from './models/HTTP';
import {Property} from './models/Property';
import {ShareData, SharedResource} from './models/SharedResource';
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
    return new APIList<SharedResource, ShareData>(this).push('share');
  }

  property(id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }
    return new APIResource<Property>(this).push('properties', id);
  }

}

export default APIResourceFile

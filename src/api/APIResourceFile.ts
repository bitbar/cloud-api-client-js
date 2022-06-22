import {API} from '../API';
import {APIEntity} from './APIEntity';
import {APIList, CollectionBasicQueryParams} from './APIList'
import {APIResource} from './APIResource'
import {QueryParams} from './models/HTTP';
import {UserFile, UserFileTag} from "./models/UserFile";

export interface FileSizeData extends QueryParams {
  height: number;
  width: number;
}

export class APIResourceFile extends APIResource<UserFile> {

  /**
   * /files/{id}
   */
  constructor(parent: APIEntity<any> | API, id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    super(parent);
    this.push('files', id);
  }

  // use this to download file content
  // /files/{id}/file
  file() {
    return new APIResource<UserFile, FileSizeData, void>(this).push('file');
  }

  // /files/{id}/icon
  icon() {
    return new APIResource(this).push('icon');
  }

  // /files/{id}/tags
  tags() {
    return new APIList<UserFileTag, CollectionBasicQueryParams, void>(this).push('tags');
  }

}

export default APIResourceFile

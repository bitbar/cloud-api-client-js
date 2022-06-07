import {API} from '../API';
import {APIEntity} from './APIEntity';
import {APIList} from './APIList'
import {APIResource} from './APIResource'
import {UserFile} from "./models/UserFile";

/**
 * APIResourceFile
 *
 * @class
 * @extends APIResource
 */
export class APIResourceFile extends APIResource<UserFile> {

  /**
   * /files/{id}
   *
   * Constructor
   */
  constructor(parent: APIEntity<any> | API, id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    super(parent);
    this.push('files', id);
  }

  // use this to download file content
  file() {
    return new APIResource(this).push('file');
  }

  // /files/{id}/icon
  icon() {
    return new APIResource(this).push('icon');
  }

  // /files/{id}/tags
  tags() {
    return new APIList(this).push('tags');
  }

}

export default APIResourceFile

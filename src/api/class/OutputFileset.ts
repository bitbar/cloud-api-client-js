import {API} from '../../API';
import {APIEntity} from '../APIEntity';
import {APIList} from '../APIList'
import {APIResource} from '../APIResource'
import {NonRequestable} from '../decorators/NonRequestable';
import {Screenshot} from '../models/Screenshot';
import {UserFile} from '../models/UserFile';
import {FilesQueryParams} from './FilesQueryParams';
import APIListOutputFiles from '../APIListOutputFiles';


@NonRequestable
export class OutputFileset extends APIResource<UserFile, FilesQueryParams> {

  /**
   * /output-file-set
   *
   * Constructor
   */
  constructor(parent: APIEntity | API) {
    super(parent);
    this.push('output-file-set');
  }

  // /output-file-set/files
  files() {
    return new APIListOutputFiles(this);
  }

  // /output-file-set/files/{id}
  file(id: number) {
    return new APIResource<UserFile, FilesQueryParams>(this).push('files', id);
  }

  // /output-file-set/files.zip
  filesZip() {
    return new APIResource<Blob, FilesQueryParams>(this).push('files.zip');
  }

  // /output-file-set/screenshots
  screenshots() {
    return new APIList<Screenshot, FilesQueryParams>(this).push('screenshots');
  }

  // /output-file-set/screenshots/{id}
  screenshot(id: number) {
    return new APIResource<Screenshot, FilesQueryParams>(this).push('screenshots', id);
  }

  // /output-file-set/screenshots/{id}/file/{id}
  screenshotFile(id: number) {
    return this.screenshot(id).push('file');
  }
}

export default OutputFileset

import {API} from '../../API';
import {APIEntity} from '../APIEntity';
import {APIList} from '../APIList'
import {APIResource} from '../APIResource'
import {NonRequestable} from '../decorators/NonRequestable';
import {NoData} from '../models/HTTP';
import {UserFile} from '../models/UserFile';
import {FilesQueryParams} from './FilesQueryParams';


@NonRequestable
export class InputFileset extends APIResource<NoData> {

  constructor(parent: APIEntity | API) {
    super(parent);
    this.push('input-file-set');
  }

  /**
   * @remarks Endpoint /input-file-set/files
   */
  files() {
    return new APIList<UserFile, FilesQueryParams, NoData>(this).push('files');
  }

  /**
   * @remarks Endpoint /input-file-set/files.zip
   */
  filesZip() {
    return new APIResource<Blob, FilesQueryParams>(this).push('files.zip');
  }
}

export default InputFileset

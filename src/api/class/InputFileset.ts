import {AxiosResponse} from "axios";
import {API} from '../../API';
import {APIEntity} from '../APIEntity';
import {APIList} from '../APIList'
import {APIResource} from '../APIResource'
import {UserFile} from "../models/UserFile";


export class InputFileset extends APIResource<void> {

  constructor(parent: APIEntity | API) {
    super(parent);
    this.push('input-file-set');
  }

  // /input-file-set/files
  files(): APIList<UserFile> {
    return new APIList(this).push('files');
  }

  // /input-file-set/files.zip
  filesZip(): APIResource<Blob> {
    return new APIResource(this).push('files.zip');
  }

  // Not handled in API so locking possibility to send requests
  /* istanbul ignore next */
  send(): Promise<AxiosResponse> {
    return Promise.reject();
  }
}

export default InputFileset

import {AxiosResponse} from "axios";
import {API} from '../../API';
import {APIEntity} from '../APIEntity';
import {APIList} from '../APIList'
import {APIResource} from '../APIResource'
import {Screenshot} from "../models/Screenshot";
import {UserFile} from "../models/UserFile";
import {NON_MEDIA_FILES_FILTER} from "./NonMedia.filter";


export class OutputFileset extends APIResource {

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
  files(): APIList<UserFile> {
    return new APIList(this).push('files');
  }

  // /output-file-set/files/{id}
  file(id: number): APIResource<UserFile> {
    return new APIResource(this).push('files', id);
  }

  // /output-file-set/files.zip
  filesZip(): APIResource<Blob> {
    return new APIResource(this).push('files.zip');
  }

  // /output-file-set/screenshots
  screenshots(): APIList<Screenshot> {
    return new APIList(this).push('screenshots');
  }

  // /output-file-set/screenshots/{id}
  screenshot(id: number): APIResource<Screenshot> {
    return new APIResource(this).push('screenshots', id);
  }

  // /output-file-set/screenshots/{id}/file/{id}
  screenshotFile(id: number): APIResource<UserFile> {
    return this.screenshot(id).push('file');
  }

  // Filter files out by ready videos
  videos(): APIList<UserFile> {
    return this.files().params({
      filter: 's_state_eq_READY',
      tag: ['video']
    });
  }

  // Filter files out by non-media
  nonMediaFiles(): APIList<UserFile> {
    return this.files().filter(NON_MEDIA_FILES_FILTER);
  }

  // Not handled in API so locking possibility to send requests
  /* istanbul ignore next */
  send(): Promise<AxiosResponse> {
    return Promise.reject();
  }

}

export default OutputFileset

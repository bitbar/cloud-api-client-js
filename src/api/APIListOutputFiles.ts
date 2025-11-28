import {API} from '../API';
import {APIEntity} from './APIEntity';
import {APIList} from './APIList';
import {UserFile} from './models/UserFile';
import {FilesQueryParams} from './class/FilesQueryParams';
import {IMAGE_FILES_FILTER} from './class/Images.filter';
import {NON_MEDIA_FILES_FILTER} from './class/NonMedia.filter';


export class APIListOutputFiles extends APIList<UserFile, FilesQueryParams> {

  /**
   * /files
   */
  constructor(parent: APIEntity | API) {
    super(parent);
    this.push('files');
  }

  performance(): this {
    return this.params({
      tag: ['performance']
    })
  }

  images(): this {
    return this.filter(IMAGE_FILES_FILTER);
  }

  // Filter files out by non-media
  nonMediaFiles(): this {
    return this.filter(NON_MEDIA_FILES_FILTER);
  }

  // Filter files out by ready videos
  videos(): this {
    return this.params({
      filter: 's_state_eq_READY',
      tag: ['video']
    });
  }
}

export default APIListOutputFiles;

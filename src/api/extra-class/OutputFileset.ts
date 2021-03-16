import APIResource from '../APIResource'
import APIList from '../APIList'

import FilterBuilder from '../../FilterBuilder'

// Create non-media files filter
const NON_MEDIA_FILES_FILTER = new FilterBuilder();
NON_MEDIA_FILES_FILTER.eq('state', 'READY');
NON_MEDIA_FILES_FILTER.notin('mimetype', [
  // no images
  'image/png', 'image/jpg', 'image/jpeg', 'image/webp', 'image/gif',

  // no videos
  'video/mp4', 'video/avi', 'video/webm', 'video/ogg', 'video/mpeg'
]);

/**
 * OutputFileset
 *
 * @class
 * @extends APIResource
 */
class OutputFileset extends APIResource {

  /**
   * /output-file-set
   *
   * Constructor
   */
  constructor (parent: object) {
    super(parent);
    this.push('output-file-set');
  }

  // /output-file-set/files
  public files () {
    return new APIList(this).push('files');
  }

  // /output-file-set/files.zip
  public filesZip () {
    return new APIResource(this).push('files.zip');
  }

  // /output-file-set/screenshots
  public screenshots () {
    return new APIList(this).push('screenshots');
  }

  // /output-file-set/screenshots/{id}
  public screenshot (id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    return new APIResource(this).push('screenshots', id);
  }

  // /output-file-set/screenshots/{id}/file/{id}
  public screenshotFile (id: number) {
    this.screenshot(id).push('file');
  }

  // Filter files out by ready videos
  public videos () {
    return this.files().params({
      filter: 's_state_eq_READY',
      tag: ['video']
    });
  }

  // Filter files out by non-media
  public nonMediaFiles () {
    return this.files().filter(NON_MEDIA_FILES_FILTER);
  }

}

export default OutputFileset

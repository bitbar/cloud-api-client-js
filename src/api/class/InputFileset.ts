import {API} from '../../API';
import {APIEntity} from '../APIEntity';
import {APIList} from '../APIList'
import {APIResource} from '../APIResource'

/**
 * InputFileset
 *
 * @class
 * @extends APIResource
 */
export class InputFileset extends APIResource {

  /**
   * /input-file-set
   *
   * Constructor
   */
  constructor(parent: APIEntity | API) {
    super(parent);
    this.push('input-file-set');
  }

  // /input-file-set/files
  public files() {
    return new APIList(this).push('files');
  }

  // /input-file-set/files.zip
  public filesZip() {
    return new APIResource(this).push('files.zip');
  }
}

export default InputFileset

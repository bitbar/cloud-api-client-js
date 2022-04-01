import {API} from "../API";
import {APIEntity} from './APIEntity';
import {APIList} from './APIList'

interface UploadObj {
  /**
   * Directory
   */
  dir: string;

  /**
   * Filename
   */
  filename: string;
}

/**
 * APIListFiles
 *
 * @class
 * @extends APIList
 */
export class APIListFiles extends APIList<any> {

  // Constructor
  constructor (parent: APIEntity<any> | API) {
    super(parent);
    this.push('files');
  }

  // Siplifies process of uploading
  public upload (obj: UploadObj) {
    let form;

    // For NodeJS
    if (global.isNodeJs) {
      const fs = require('fs');
      const FormData = require('form-data');

      form = new FormData();
      form.append('file', fs.createReadStream(obj.dir + '/' + obj.filename), {
        filename: obj.filename
      });

    /**
     * Browser
     * @todo
     */
    } else {
      throw new Error('Not supported yet!');
    }

    return this.post().headers(form.getHeaders()).data(form);
  }

}

export default APIListFiles

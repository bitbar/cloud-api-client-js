import {API} from "../API";
import {APIEntity} from './APIEntity';
import {APIList} from './APIList'
import {FilesQueryParams} from "./class/FilesQueryParams";
import {UserFile} from "./models/UserFile";


type UploadObj = {
  dir: string;
  filename: string;
}

export interface FileData {
  file: Blob;
  global: boolean;
}

export class APIListFiles extends APIList<UserFile, FilesQueryParams, FileData> {

  /**
   * /files
   */
  constructor(parent: APIEntity | API) {
    super(parent);
    this.push('files');
  }

  /**
   * Simplifies process of uploading
   * /files
   */
  upload(obj: UploadObj): this {
    // For NodeJS
    // @ts-ignore
    if (global.isNodeJs) {
      return this.nodeUpload(obj);
    } else {
      /**
       * Browser
       * @todo
       */
      throw new Error('Not supported yet!');
    }
  }

  private nodeUpload(file: UploadObj): this {
    const fs = require('fs');
    const FormData = require('form-data');
    const form = new FormData();
    form.append('file', fs.createReadStream(file.dir + '/' + file.filename), {
      filename: file.filename
    });
    return this.post().headers(form.getHeaders()).data(form);
  }

}

export default APIListFiles

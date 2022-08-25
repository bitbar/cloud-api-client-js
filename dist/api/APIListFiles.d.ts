import { API } from '../API';
import { APIEntity } from './APIEntity';
import { APIList } from './APIList';
import { FilesQueryParams } from './class/FilesQueryParams';
import { FileData, UploadObj, UserFile } from './models/UserFile';
export declare class APIListFiles extends APIList<UserFile, FilesQueryParams, FileData> {
    constructor(parent: APIEntity | API);
    upload(obj: UploadObj): this;
    private nodeUpload;
}
export default APIListFiles;

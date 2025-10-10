import { API } from '../API';
import { APIEntity } from './APIEntity';
import { APIList } from './APIList';
import { UserFile } from './models/UserFile';
import { FilesQueryParams } from './class';
export declare class APIListOutputFiles extends APIList<UserFile, FilesQueryParams> {
    constructor(parent: APIEntity | API);
    performance(): this;
    images(): this;
    nonMediaFiles(): this;
    videos(): this;
}
export default APIListOutputFiles;

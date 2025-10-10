import { API } from '../../API';
import { APIEntity } from '../APIEntity';
import { APIList } from '../APIList';
import { APIResource } from '../APIResource';
import { Screenshot } from '../models/Screenshot';
import { UserFile } from '../models/UserFile';
import { FilesQueryParams } from './FilesQueryParams';
import APIListOutputFiles from '../APIListOutputFiles';
export declare class OutputFileset extends APIResource<UserFile, FilesQueryParams> {
    constructor(parent: APIEntity | API);
    files(): APIListOutputFiles;
    file(id: number): APIResource<UserFile, FilesQueryParams, FilesQueryParams>;
    filesZip(): APIResource<Blob, FilesQueryParams, FilesQueryParams>;
    screenshots(): APIList<Screenshot, FilesQueryParams, any>;
    screenshot(id: number): APIResource<Screenshot, FilesQueryParams, FilesQueryParams>;
    screenshotFile(id: number): APIResource<Screenshot, FilesQueryParams, FilesQueryParams>;
}
export default OutputFileset;

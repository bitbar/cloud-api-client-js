import { API } from '../../API';
import { APIEntity } from '../APIEntity';
import { APIList } from '../APIList';
import { APIResource } from '../APIResource';
import { NoData } from '../models/HTTP';
import { UserFile } from '../models/UserFile';
import { FilesQueryParams } from './FilesQueryParams';
export declare class InputFileset extends APIResource<NoData> {
    constructor(parent: APIEntity | API);
    files(): APIList<UserFile, FilesQueryParams, void>;
    filesZip(): APIResource<Blob, FilesQueryParams, FilesQueryParams>;
}
export default InputFileset;

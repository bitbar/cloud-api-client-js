import APIList from './APIList';
interface UploadObj {
    dir: string;
    filename: string;
}
declare class APIListFiles extends APIList {
    constructor(parent: object);
    upload(obj: UploadObj): void;
}
export default APIListFiles;

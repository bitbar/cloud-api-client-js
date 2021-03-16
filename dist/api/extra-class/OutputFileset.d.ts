import APIResource from '../APIResource';
import APIList from '../APIList';
declare class OutputFileset extends APIResource {
    constructor(parent: object);
    files(): APIList;
    filesZip(): APIResource;
    screenshots(): APIList;
    screenshot(id: number): APIResource;
    screenshotFile(id: number): void;
    videos(): APIList;
    nonMediaFiles(): APIList;
}
export default OutputFileset;

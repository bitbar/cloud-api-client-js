import APIResource from './APIResource';
import APIResourceRun from './APIResourceRun';
import APIList from './APIList';
declare class APIResourceProject extends APIResource {
    constructor(parent: object, id: number);
    runs(): APIList;
    run(id: number): APIResourceRun;
    runsExtended(): APIList;
    runExtended(id: number): APIResource;
    files(): APIList;
    filesZip(): APIResource;
    sharings(): APIList;
    sharing(id: number): APIResource;
}
export default APIResourceProject;

import APIResource from './APIResource';
import APIResourceDeviceSession from './APIResourceDeviceSession';
import APIList from './APIList';
declare class APIResourceRun extends APIResource {
    constructor(parent: object, id: number);
    config(): APIResource;
    deviceSessions(): APIList;
    deviceSession(id: number): APIResourceDeviceSession;
    steps(): APIList;
    files(): APIList;
    filesZip(): APIResource;
    tags(): APIList;
    tag(id: number): APIResource;
}
export default APIResourceRun;

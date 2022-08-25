import { APIEntity } from '../APIEntity';
import { APIResource } from '../APIResource';
import { BuildLogsData } from '../models/UserFile';
export declare function postDeviceRunIds<T>(parent: APIEntity, name: string, ids?: Array<number>): APIResource<T, BuildLogsData, BuildLogsData>;
export default postDeviceRunIds;

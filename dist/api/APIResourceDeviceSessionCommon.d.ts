import { API } from '../API';
import { APIEntity } from './APIEntity';
import { APIList } from './APIList';
import { APIResource } from './APIResource';
import { InputFileset } from './class/InputFileset';
import { OutputFileset } from './class/OutputFileset';
import { DeviceSessionCommon } from './interface/DeviceSessionCommon';
import { DeviceSession, DeviceSessionCommand, DeviceSessionStep, SessionRunStepQueryParams, SessionStepQueryParams } from './models/DeviceSession';
import { CollectionBasicQueryParams, NoQueryParams } from './models/HTTP';
import APIListScreenshots from './APIListScreenshots';
import APIListTestCaseRuns from './APIListTestCaseRuns';
export declare class APIResourceDeviceSessionCommon extends APIResource<DeviceSession> implements DeviceSessionCommon {
    constructor(parent: APIEntity<any> | API, id: number);
    commands(): APIList<DeviceSessionCommand, import("./models/HTTP").CollectionQueryParams, any>;
    input(): InputFileset;
    output(): OutputFileset;
    release(): APIResource<DeviceSession, NoQueryParams, void>;
    screenshots(): APIListScreenshots;
    screenshot(id: number): APIResource<any, import("./models/HTTP").QueryParams, import("./models/HTTP").QueryParams>;
    steps(): APIList<DeviceSessionStep, SessionRunStepQueryParams | SessionStepQueryParams | CollectionBasicQueryParams, void>;
    step(id: number | 'current'): APIResource<DeviceSessionStep, NoQueryParams, void>;
    currentStep(): APIResource<DeviceSessionStep, NoQueryParams, void>;
    testCaseRuns(): APIListTestCaseRuns;
    connections(): APIList<any, import("./models/HTTP").CollectionQueryParams, any>;
    logs(): APIResource<any, import("./models/HTTP").QueryParams, import("./models/HTTP").QueryParams>;
    clusterLogs(): APIResource<any, import("./models/HTTP").QueryParams, import("./models/HTTP").QueryParams>;
}
export default APIResourceDeviceSessionCommon;

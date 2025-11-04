import { API } from '../API';
import { APIEntity } from './APIEntity';
import { APIList } from './APIList';
import { APIResource } from './APIResource';
import { AdminTestRun } from './models/AdminTestRun';
import { DeviceSessionStep } from './models/DeviceSession';
import { CollectionBasicQueryParams, NoQueryParams } from './models/HTTP';
import { RunData, RunQueryParam, TestRun, TestRunData } from './models/TestRun';
import { TestRunDataAvailability, TestRunDataAvailabilityQueryParams } from './models/TestRunDataAvailability';
import { UserFile } from './models/UserFile';
import APIListTestRunDeviceSessions from './APIListTestRunDeviceSessions';
export declare class APIResourceRunCommon extends APIResource<TestRun, RunQueryParam, TestRunData | RunData> {
    constructor(parent: APIEntity<any> | API, id: number);
    abort(): APIResource<TestRun | AdminTestRun, NoQueryParams, RunData>;
    buildLogsZip(ids?: Array<number>): APIResource<UserFile, import("./models/UserFile").BuildLogsData, import("./models/UserFile").BuildLogsData>;
    dataAvailability(): APIResource<TestRunDataAvailability, TestRunDataAvailabilityQueryParams, void>;
    deviceSessions(): APIListTestRunDeviceSessions;
    filesZip(ids?: Array<number>): APIResource<UserFile, import("./models/UserFile").BuildLogsData, import("./models/UserFile").BuildLogsData>;
    logsZip(ids?: Array<number>): APIResource<UserFile, import("./models/UserFile").BuildLogsData, import("./models/UserFile").BuildLogsData>;
    performanceZip(ids?: Array<number>): APIResource<UserFile, import("./models/UserFile").BuildLogsData, import("./models/UserFile").BuildLogsData>;
    retry(ids?: Array<number>): APIResource<TestRun, import("./models/UserFile").BuildLogsData, import("./models/UserFile").BuildLogsData>;
    screenshotsZip(ids?: Array<number>): APIResource<UserFile, import("./models/UserFile").BuildLogsData, import("./models/UserFile").BuildLogsData>;
    steps(): APIList<DeviceSessionStep, CollectionBasicQueryParams, void>;
}
export default APIResourceRunCommon;

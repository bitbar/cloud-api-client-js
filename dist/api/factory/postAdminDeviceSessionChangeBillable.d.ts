import { APIResource } from '../APIResource';
import APIResourceDeviceSessionCommon from '../APIResourceDeviceSessionCommon';
import { DeviceSession } from '../models/DeviceSession';
export declare function postAdminDeviceSessionChangeBillable(parent: APIResourceDeviceSessionCommon, billable: boolean): APIResource<DeviceSession, import("../..").QueryParams, import("../..").QueryParams>;
export default postAdminDeviceSessionChangeBillable;

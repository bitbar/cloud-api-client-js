import { CollectionQueryParams } from './HTTP';
import { DeviceSessionState } from './DeviceSession';
import { OsType } from './Enum';
export declare enum FrameworkType {
    AUTOMATIC = "AUTOMATIC",
    MANUAL_APP = "MANUAL_APP",
    MANUAL_WEB = "MANUAL_WEB",
    REMOTE = "REMOTE"
}
export type AdminFrameworkStatistics = {
    cloudName: string;
    count: number;
    day: number;
    deviceModelId: number;
    deviceModelName: string;
    frameworkId: number;
    frameworkName: string;
    id: number;
    osType: OsType;
    releaseVersion: string;
    state: DeviceSessionState;
    type: FrameworkType;
    userEmail: string;
    userId: number;
};
export interface AdminStatisticsParams extends CollectionQueryParams {
    days: number;
}

import { OsType } from './Enum';
export type DeviceTimeCountSessionReportEntry = {
    countDeviceSessions: number;
    countTestRuns: number;
    day: number;
    deviceModelName: string;
    deviceTime: number;
    id: number;
    osType: OsType;
    projectName: string;
    userEmail: string;
};

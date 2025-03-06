import { OsType } from './Enum';
export type DeviceStatistics = {
    deviceName: string;
    failedDevices: number;
    failedRatio: number;
    failedTests: number;
    id: number;
    osType: OsType;
    passedRatio: number;
    passedTests: number;
    releaseVersion: string;
    totalTests: number;
    usageCount: number;
    usageMillis: number;
};

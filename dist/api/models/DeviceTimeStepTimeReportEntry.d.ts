import { OsType } from './Enum';
export type DeviceTimeStepTimeReportEntry = {
    day: number;
    deviceModelName: string;
    deviceTime: number;
    id: number;
    osType: OsType;
    preparationTime: number;
    projectName: string;
    userEmail: string;
    waitingTime: number;
};

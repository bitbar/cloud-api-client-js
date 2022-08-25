import { OsType } from './Enum';
export declare type DevicePicker = {
    deviceFilterGroups: Array<DeviceFilterGroup>;
    id: number;
};
export declare type DeviceFilter = {
    displayName: string;
    hidden: boolean;
    id: number;
    name: string;
    osType: OsType;
};
export declare type DeviceFilterGroup = {
    deviceFilters: Array<DeviceFilter>;
    id: number;
    name: string;
};

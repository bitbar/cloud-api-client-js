import {OsType} from "./Enum";

export type DevicePicker = {
  deviceFilterGroups: Array<DeviceFilterGroup>;
  id: number;
  selfURI: string;
}

export type DeviceFilter = {
  displayName: string;
  hidden: boolean;
  id: number;
  name: string;
  osType: OsType;
  selfURI: string;
}

export type DeviceFilterGroup = {
  deviceFilters: Array<DeviceFilter>;
  id: number;
  name: string;
  selfURI: string;
}

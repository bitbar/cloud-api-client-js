import {OsType} from "./Enum";

export type DeviceGroup = {
  deviceCount: number;
  displayName: string;
  id: number;
  name: string;
  osType: OsType;
  shared: boolean;
  userEmail: string;
  userId: number;
}

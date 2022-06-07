import {Platform} from "./Device";
import {OsType} from "./Enum";

export type DeviceModel = {
  avgWaitingTime: number;
  dedicated: boolean;
  enabled: boolean;
  id: number;
  location: string;
  name: string;
  online: number;
  osType: OsType;
  platform: Platform;
  queueSize: number;
  releaseVersion: string;
  running: number;
  total: number;
}

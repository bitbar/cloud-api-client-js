import {CollectionQueryParams} from "../APIList";

export type AdminDeviceSessionStatistics = {
  abortedDeviceCount: number;
  avgDeviceSessionDeviceTime: number;
  avgDeviceSessionDuration: number;
  avgDeviceSessionSuccessRatio: number;
  errorsDeviceCount: number;
  excludedDeviceCount: number;
  finishedDeviceCount: number;
  id: number;
  maxDeviceSessionDuration: number;
  minDeviceSessionDuration: number;
  runningDeviceCount: number;
  succeededDeviceCount: number;
  timeoutedDeviceCount: number;
  totalDeviceCount: number;
  waitingDeviceCount: number;
  warningDeviceCount: number;
}
export interface AdminStatisticsParams extends CollectionQueryParams {
  days: number;
}

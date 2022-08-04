import {CollectionQueryParams} from "../APIList";

export type UserDeviceTimeSummary = {
  automaticDeviceTime: number;
  freeDeviceTime: number;
  id: number;
  inspectorDeviceTime: number;
  periodEnd: number;
  periodStart: number;
  remoteDeviceTime: number;
  totalDeviceTime: number;
}

export interface DeviceTimeSummaryParams extends CollectionQueryParams {
  forWholeAccount: boolean;
}

import {DeviceSessionState, DeviceSessionStepType} from './DeviceSession';

export type AdminDeviceSession = {
  billable: boolean;
  createTime: number;
  currentStepType: DeviceSessionStepType;
  deviceTime: number;
  endTime: number;
  errorMessage: string;
  id: number;
  priority: number;
  projectId: number;
  projectName: string;
  retriedFailReason: string;
  startTime: number;
  startedByDisplayName: string;
  state: DeviceSessionState;
  testRunId: number;
  testRunName: string;
}

export type AdminInteractiveDeviceSession = {
  billable: boolean;
  createTime: number;
  deviceId: number;
  deviceModelId: number;
  deviceModelName: string;
  deviceName: string;
  deviceTime: number;
  duration: number;
  endTime: number;
  errorMessage: string;
  id: number;
  startTime: number;
  state: DeviceSessionState;
  userEmail: string;
  userId: number;
}

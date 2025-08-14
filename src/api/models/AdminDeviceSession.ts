import {DeviceSessionState, DeviceSessionStepType, DeviceSessionType} from './DeviceSession';

export type AdminDeviceSession = {
  createTime: number;
  currentStepType: DeviceSessionStepType;
  duration: number;
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
  createTime: number;
  deviceId: number;
  deviceModelId: number;
  deviceModelName: string;
  deviceName: string;
  duration: number;
  endTime: number;
  errorMessage: string;
  id: number;
  startTime: number;
  state: DeviceSessionState;
  type: DeviceSessionType;
  userEmail: string;
  userId: number;
}

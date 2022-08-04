export type AdminOverview = {
  activeUsersCount: number;
  id: number;
  inspectorSessionsCount: number;
  remoteSessionsCount: number;
  runningDeviceModelsCount: number;
  runningTestRunsCount: number;
  waitingDeviceModelsCount: number;
  waitingTestRunsCount: number;
}

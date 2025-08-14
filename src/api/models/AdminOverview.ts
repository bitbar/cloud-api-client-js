export type AdminOverview = {
  activeUsersCount: number;
  id: number;
  offlineClusterCount: number;
  offlineDeviceCount: number;
  offlineDeviceModelCount: number;
  runningInspectorSessionsCount: number;
  runningTestRunsCount: number;
  totalClusterCount: number;
  totalDeviceCount: number;
  totalDeviceModelCount: number;
  totalInspectorSessionsCount: number;
  totalTestRunCount: number;
  totalUserCount: number;
  waitingTestRunsCount: number;
}

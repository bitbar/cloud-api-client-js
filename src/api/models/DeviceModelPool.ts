export enum RetentionStrategy {
  CLUSTER_ON_OFF = 'CLUSTER_ON_OFF',
  MIN_FREE_MAX_TOTAL = 'MIN_FREE_MAX_TOTAL',
  POOL_MANAGER_AWARE = 'POOL_MANAGER_AWARE'
}

export type DeviceModelPool = {
  createTime: number;
  enabled: boolean;
  id: number;
  location: string;
  maxTotal: number;
  minAvailable: number;
  name: string;
  numberOfBrowsers: number;
  osVersion: string;
  retentionStrategy: RetentionStrategy;
  running: number;
}

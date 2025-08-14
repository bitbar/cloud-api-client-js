import {ClusterType} from './Cluster';

export type Maintenance = {
  enabled: boolean;
  id: number;
}

export type MaintenanceData = {
  enabled: boolean;
  type: ClusterType;
}


import {AdminDevice} from './AdminDevice';
import {CollectionResponse, QueryParams} from './HTTP';

export type Cluster = {
  devices: CollectionResponse<AdminDevice>;
  enabled: boolean;
  id: number;
  ipAddress: string;
  jenkinsUrl: string;
  jenkinsVersion: string;
  location: string;
  name: string;
  pluginVersion: string;
  region: string;
  state: ClusterState;
  stateChangeTime: number;
  stateTime: number;
  type: ClusterType;
  url: string;
}

export enum ClusterState {
  'OFFLINE',
  ONLINE = 'ONLINE',
  RESTARTING = 'RESTARTING',
  QUIET_DOWN = 'QUIET_DOWN',
  MAINTENANCE = 'MAINTENANCE'
}

export enum ClusterType {
  BARE_METAL = 'BARE_METAL',
  EC2 = 'EC2',
  VM = 'VM'
}

export interface ClusterParams extends QueryParams {
  withDevices: boolean;
}

export type ClusterData = Pick<Cluster, 'enabled' | 'url'> & {
  quietDown: boolean;
  restart: boolean;
  turnMaintenance: boolean;
}

export type Maintenance = {
  enabled: boolean;
  id: number;
}

export enum MaintenanceType {
  BARE_METAL ='BARE_METAL',
  EC2 = 'EC2',
  VM = 'VM'
}

export type MaintenanceData = {
  enabled: boolean;
  type: MaintenanceType;
}

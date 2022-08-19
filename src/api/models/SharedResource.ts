export enum SharedResourceType {
  DEVICE_GROUP = 'DEVICE_GROUP',
  FILE = 'FILE',
  PROJECT = 'PROJECT',
}

export type SharedResource = {
  id: number;
  name: string;
  resourceId: number;
  type: SharedResourceType
}

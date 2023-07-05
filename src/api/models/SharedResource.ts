import {QueryParams} from './HTTP';


export enum SharedResourceType {
  DEVICE_GROUP = 'DEVICE_GROUP',
  FILE = 'FILE',
  PROJECT = 'PROJECT',
}

export type SharedResource = {
  id: number;
  name: string;
  resourceId: number;
  type: SharedResourceType;
}

export interface ShareData extends QueryParams {
  accessGroupId: number;
  email: string;
}

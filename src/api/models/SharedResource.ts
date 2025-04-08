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

export interface ShareWithGroup extends QueryParams {
  accessGroupId: number;
}

export interface ShareWithEmail extends QueryParams {
  email: string;
}

export type ShareData = ShareWithGroup | ShareWithEmail;

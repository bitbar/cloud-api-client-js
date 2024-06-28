import {CollectionQueryParams} from './HTTP';

export type Role = {
  addedByEmail: string;
  expireTime: number;
  id: number;
  name: string;
  value: number;
  valueCalculated: boolean;
  userRole: boolean;
}

export interface RoleParams extends CollectionQueryParams {
  withoutPriorities: boolean;
}

export type RoleData = Pick<Role, 'expireTime' | 'value'> & {roleId: number};

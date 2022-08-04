import {CollectionQueryParams} from "../APIList";

export type Role = {
  addedByEmail: string;
  expireTime: number;
  id: number;
  name: string;
  value: number;
  valueCalculated: boolean;
}

export interface RoleParams extends CollectionQueryParams {
  withoutPriorities: boolean;
}

export type RoleData = Pick<Role, 'expireTime' | 'value'> & { roleId: number; };

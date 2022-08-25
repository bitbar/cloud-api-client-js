import { CollectionQueryParams } from './HTTP';
export declare type Role = {
    addedByEmail: string;
    expireTime: number;
    id: number;
    name: string;
    value: number;
    valueCalculated: boolean;
};
export interface RoleParams extends CollectionQueryParams {
    withoutPriorities: boolean;
}
export declare type RoleData = Pick<Role, 'expireTime' | 'value'> & {
    roleId: number;
};

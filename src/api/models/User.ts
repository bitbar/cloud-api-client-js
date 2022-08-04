import {CollectionQueryParams} from "../APIList";
import {Role} from "./Role";

export enum MfaStatus {
  VERIFICATION_NEED = 'VERIFICATION_NEED',
  DISABLED = 'DISABLED',
  ENABLED = 'ENABLED'
}

export enum UserStatus {
  INACTIVE = 'INACTIVE',
  DISABLED = 'DISABLED',
  ENABLED = 'ENABLED'
}

export type User = {
  accountId: number;
  accountOwners: Array<User>;
  accountServiceIds: Array<number>;
  address: string;
  apiKey: string;
  city: string;
  code: string;
  country: string;
  createTime: number;
  createdByEmail: string;
  createdById: number;
  deleteTime: number;
  email: string;
  enabled: boolean;
  firstName: string;
  id: number;
  isMainUser: boolean;
  lastLaunchedTestTime: number;
  lastLoginTime: number;
  lastName: string;
  mainUserEmail: string;
  mainUserId: number;
  mfaQRCodeUrl: string;
  mfaStatus: MfaStatus;
  organization: string;
  phone: string;
  registrationIP: string;
  roles: Array<Role>;
  serviceIds: Array<number>;
  state: string;
  status: UserStatus;
  timeZone: string;
  vatId: string;
}

export type UserData = { email: string; };

export interface UserParams extends CollectionQueryParams {
  WITH_ADDRESS: boolean;
  WITH_USER_INFO: boolean;
  onlyMainUsers: boolean;
  onlyWithDisabledServices: boolean;
  withRole: string;
  withRoles: boolean;
}

export type UserUpdateAccount = Pick<User, 'accountId'>;



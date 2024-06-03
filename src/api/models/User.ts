import {CollectionQueryParams, QueryParams} from './HTTP';
import {Role} from './Role';


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
  accountName: string;
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
  isAccountOwner: boolean;
  lastLaunchedTestTime: number;
  lastLoginTime: number;
  lastName: string;
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

export type UserData = Pick<User, 'email'>;

export interface UserParams extends CollectionQueryParams {
  WITH_ADDRESS: boolean;
  WITH_USER_INFO: boolean;
  onlyMainUsers: boolean;
  onlyWithDisabledServices: boolean;
  withRole: string;
  withRoles: boolean;
}

export type UserUpdateAccount = Pick<User, 'accountId'>;

export interface LoginData {
  username: string;
  password: string;
}


export type UserPasswordData = {
  key: string;
  password: string;
};
export type UserActivateData = {
  zip: string;
} & UserPasswordData
  & Pick<User, 'address' | 'city' | 'country' | 'email' | 'firstName' | 'lastName' | 'organization' | 'phone' | 'state' | 'vatId'>;

export interface UserRecoveryQueryParams extends QueryParams {
  recoveryKey: string;
}

export interface ValidateVatQueryParams extends QueryParams {
  countryCode: string;
  vatId: string;
}

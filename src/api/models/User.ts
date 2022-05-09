import {Role} from "./Role";

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
  mfaStatus: 'VERIFICATION_NEED' | 'DISABLED' | 'ENABLED';
  organization: string;
  phone: string;
  registrationIP: string;
  roles: Array<Role>;
  selfURI: string;
  serviceIds: Array<number>;
  state: string;
  status: 'INACTIVE' | 'DISABLED' | 'ENABLED';
  timeZone: string;
  vatId: string;
}

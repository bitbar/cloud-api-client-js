import {ChargeType, PaymentMethod} from './AccountService';
import {CollectionQueryParams} from './HTTP';
import {Role} from './Role';


export type Service = {
  activateTime: number;
  activated: boolean;
  archiveTime: number;
  autoRenew: boolean;
  centPrice: number;
  chargeType: ChargeType;
  commonId: string;
  customPlan: boolean;
  defaultConcurrences: Array<number>;
  description: string;
  externalId: string;
  features: string;
  id: number;
  includedHours: number;
  name: string;
  pricePerHour: number;
  priceString: string;
  roles: Array<Role>;
  unit: ServiceUnit;
}

export enum ServiceUnit {
  DAY = 'DAY',
  HOUR = 'HOUR',
  MONTH = 'MONTH',
  PROJECT = 'PROJECT',
  RUN = 'RUN',
  YEAR = 'YEAR'
}

export interface AdminServicesParams extends CollectionQueryParams {
  activeOnly: boolean;
  inUse: boolean;
  notArchive: boolean;
}

export type ServiceActivateData = {
  activateTime: number;
}

export interface ServiceData {
    address?: string;
    braintreeNonce?: string;
    cardNumber?: string;
    city?: string;
    count?: number;
    country?: string;
    cvv?: string;
    email?: string;
    expirationDate?: string;
    firstName?: string;
    lastName?: string;
    organization?: string;
    paymentMethod: PaymentMethod;
    phone?: string;
    serviceId: number;
    state?: string;
    stripeToken?: string;
    vatId?: string;
    zip?: string;
}

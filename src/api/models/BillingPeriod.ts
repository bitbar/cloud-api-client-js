import {PaymentMethod} from './AccountService';
import {DeviceSessionType} from './DeviceSession';
import {OsType} from './Enum';
import {QueryParams} from './HTTP';

export enum BillingType {
  BUY = 'BUY',
  CHARGE = 'CHARGE',
  CANCEL = 'CANCEL'
}

export type BillingPeriod = {
  accountServiceId: number;
  additionalHours: number;
  additionalHoursPrice: number;
  apiBillingPeriodType: BillingType;
  createTime: number;
  endBillingPeriod: number;
  id: number;
  lastPaymentDate: number;
  paid: boolean;
  paymentMethod: PaymentMethod;
  plan: string;
  servicePrice: number;
  startBillingPeriod: number;
  subscriptionEnd: number;
  subscriptionStart: number;
  totalPrice: number;
  usages: Array<BillingPeriodUsage>;
}

export type BillingPeriodUsage = {
  billableSeconds: number;
  id: number;
  nonBillableSeconds: number;
  osType: OsType;
  type: DeviceSessionType;
}

export interface BillingPeriodQueryParams extends QueryParams {
  onDate: number;
}

import {ServiceUnit} from "./Service";

export enum PaymentStatus {
  SUCCEEDED = 'SUCCEEDED',
  FAILED = 'FAILED',
  REDIRECTED = 'REDIRECTED'
}

export enum PaymentMethod {
  PAYPAL = 'PAYPAL',
  BRAINTREE = 'BRAINTREE',
  STRIPE = 'STRIPE',
  INVOICE = 'INVOICE',
  PROMOTION = 'PROMOTION',
  AWS = 'AWS'
}

export enum ChargeType {
  USAGE_MOBILE = 'USAGE_MOBILE',
  CONCURRENCY_MOBILE = 'CONCURRENCY_MOBILE',
  CONCURRENCY_DESKTOP = 'CONCURRENCY_DESKTOP'
}

export enum DeactivateReason {
  INITIAL_FAILURE = 'INITIAL_FAILURE',
  SCA_FAILURE = 'SCA_FAILURE',
  CHARGE_FAILURE = 'CHARGE_FAILURE',
  CANCEL = 'CANCEL',
  SUSPENDED = 'SUSPENDED',
  ANOTHER_PURCHASE = 'ANOTHER_PURCHASE'
}

export type ServicePaymentStatus = {
  accountService: AccountService;
  message: string;
  redirectUrl: string;
  status: PaymentStatus;
}

export type AccountService = {
  accountId: number;
  activatedById: number;
  activatedByName: string;
  active: boolean;
  autoRenew: boolean;
  braintreeId: string;
  chargeType: ChargeType;
  createTime: number;
  deactivateReason: DeactivateReason;
  deactivatedById: number;
  deactivatedByName: string;
  endTime: number;
  finished: boolean;
  id: number;
  lastPaymentTime: number;
  paymentMethod: PaymentMethod;
  price: number;
  serviceCount: number;
  serviceId: number;
  serviceName: string;
  startTime: number;
  subscriptionManagementURL: string;
  total: number;
  unit: ServiceUnit;
  unitCount: number;
  userEmail: string;
  userId: number;
  vatRate: number;
}

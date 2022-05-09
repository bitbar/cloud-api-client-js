import {ServiceUnit} from "./Service";

export type ServicePaymentStatus = {
  accountService: AccountService;
  message: string;
  redirectUrl: string;
  status: 'SUCCEEDED' | 'FAILED' | 'REDIRECTED';
}

export type PaymentMethod = 'PAYPAL' | 'BRAINTREE' | 'STRIPE' | 'INVOICE' | 'PROMOTION' | 'AWS';

export type AccountService = {
  accountId: number;
  activatedById: number;
  activatedByName: string;
  active: boolean;
  autoRenew: boolean;
  braintreeId: string;
  chargeType: 'USAGE_MOBILE' | 'CONCURRENCY_MOBILE' | 'CONCURRENCY_DESKTOP';
  createTime: number;
  deactivateReason: 'INITIAL_FAILURE' | 'SCA_FAILURE' | 'CHARGE_FAILURE' | 'CANCEL' | 'SUSPENDED' | 'ANOTHER_PURCHASE';
  deactivatedById: number;
  deactivatedByName: string;
  endTime: number;
  finished: boolean;
  id: number;
  lastPaymentTime: number;
  paymentMethod: PaymentMethod;
  price: number;
  selfURI: string;
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

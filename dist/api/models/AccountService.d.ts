import { ServiceUnit } from './Service';
export declare enum PaymentStatus {
    SUCCEEDED = "SUCCEEDED",
    FAILED = "FAILED",
    REDIRECTED = "REDIRECTED"
}
export declare enum PaymentMethod {
    PAYPAL = "PAYPAL",
    BRAINTREE = "BRAINTREE",
    STRIPE = "STRIPE",
    INVOICE = "INVOICE",
    PROMOTION = "PROMOTION",
    AWS = "AWS"
}
export declare enum DeactivateReason {
    INITIAL_FAILURE = "INITIAL_FAILURE",
    SCA_FAILURE = "SCA_FAILURE",
    CHARGE_FAILURE = "CHARGE_FAILURE",
    CANCEL = "CANCEL",
    SUSPENDED = "SUSPENDED",
    ANOTHER_PURCHASE = "ANOTHER_PURCHASE"
}
export type ServicePaymentStatus = {
    accountService: AccountService;
    message: string;
    redirectUrl: string;
    status: PaymentStatus;
};
export type AccountService = {
    accountId: number;
    accountName: string;
    activatedById: number;
    activatedByName: string;
    active: boolean;
    braintreeId: string;
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
    slmLicenseId: string;
    startTime: number;
    subscriptionManagementURL: string;
    unit: ServiceUnit;
    unitCount: number;
    vatRate: number;
};
export type AccountServiceData = Pick<AccountService, 'endTime' | 'serviceId' | 'slmLicenseId'> & {
    count: number;
};

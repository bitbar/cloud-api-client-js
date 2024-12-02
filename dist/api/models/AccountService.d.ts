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
export declare enum ChargeType {
    USAGE_MOBILE = "USAGE_MOBILE",
    CONCURRENCY_MOBILE = "CONCURRENCY_MOBILE",
    CONCURRENCY_DESKTOP = "CONCURRENCY_DESKTOP"
}
export declare enum DeactivateReason {
    INITIAL_FAILURE = "INITIAL_FAILURE",
    SCA_FAILURE = "SCA_FAILURE",
    CHARGE_FAILURE = "CHARGE_FAILURE",
    CANCEL = "CANCEL",
    SUSPENDED = "SUSPENDED",
    ANOTHER_PURCHASE = "ANOTHER_PURCHASE"
}
export declare type ServicePaymentStatus = {
    accountService: AccountService;
    message: string;
    redirectUrl: string;
    status: PaymentStatus;
};
export declare type AccountService = {
    accountId: number;
    accountName: string;
    activatedById: number;
    activatedByName: string;
    active: boolean;
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
    userId: number;
    vatRate: number;
};
export declare type AccountServiceData = Pick<AccountService, 'endTime' | 'serviceId'> & {
    count: number;
};

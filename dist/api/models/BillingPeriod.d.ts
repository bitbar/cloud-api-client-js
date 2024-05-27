import { PaymentMethod } from './AccountService';
import { DeviceSessionType } from './DeviceSession';
import { OsType } from './Enum';
import { QueryParams } from './HTTP';
export declare enum BillingType {
    BUY = "BUY",
    CHARGE = "CHARGE",
    CANCEL = "CANCEL"
}
export declare type BillingPeriod = {
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
};
export declare type BillingPeriodUsage = {
    billableSeconds: number;
    id: number;
    nonBillableSeconds: number;
    osType: OsType;
    type: DeviceSessionType;
};
export interface BillingPeriodQueryParams extends QueryParams {
    onDate: number;
}

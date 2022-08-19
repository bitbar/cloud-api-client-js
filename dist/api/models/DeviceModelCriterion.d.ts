export declare enum CriterionField {
    NAME = "NAME",
    FINGERPRINT = "FINGERPRINT",
    SERIAL_ID = "SERIAL_ID",
    UNLOCK_GESTURE = "UNLOCK_GESTURE",
    SOFTWARE_VERSION = "SOFTWARE_VERSION",
    INIT_STEP = "INIT_STEP",
    ACCOUNT = "ACCOUNT",
    BROWSERS = "BROWSERS"
}
export declare type DeviceModelCriterion = {
    createTime: number;
    field: CriterionField;
    id: number;
    labelGroupDisplayName: string;
    labelGroupId: number;
    labelGroupName: string;
};
export declare type DeviceModelCriterionData = Pick<DeviceModelCriterion, 'field' | 'labelGroupId'>;

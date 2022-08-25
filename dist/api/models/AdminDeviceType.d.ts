export declare type AdminDeviceType = {
    frameExtraWidth: number;
    id: number;
    imageHeight: number;
    imageLeft: number;
    imagePrefix: string;
    imageTop: number;
    imageWidth: number;
};
export declare type DeviceTypeData = Omit<AdminDeviceType, 'id'> & {
    deviceTypeId: number;
};

export type AdminDeviceType = {
  frameExtraWidth: number;
  id: number;
  imageCornerRadius: number;
  imageHeight: number;
  imageLeft: number;
  imagePrefix: string;
  imageTop: number;
  imageWidth: number;
}

export type DeviceTypeData = Omit<AdminDeviceType, 'id'> & {deviceTypeId: number};

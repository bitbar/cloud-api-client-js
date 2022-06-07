export enum LicenseStatus {
  ACTIVE = 'ACTIVE',
  EXPIRED = 'EXPIRED',
  INACTIVE = 'INACTIVE',
  CLOSED = 'CLOSED'
}

export type BaseLicense = {
  enabled: boolean;
};

export type FeatureLicense = {
  deviceLimit: number;
  deviceLimited: boolean;
  projectLimit: number;
  projectLimited: boolean;
};

export type AndroidLicense = BaseLicense & FeatureLicense & {
  cts: CTSLicense;
  uiAutomator: UIAutomatorLicense;
};

export type BuildLicense = BaseLicense & {
  limit: number;
  limited: boolean;
};

export type DesktopLicense = BaseLicense & FeatureLicense;

export type GlobalLicense = FeatureLicense;

export type InspectorLicense = BaseLicense;

export type IOSLicense = BaseLicense & FeatureLicense;

export type RecorderLicense = BaseLicense & {
  limit: number;
  limited: boolean;
};

export type ServerLicense = BaseLicense & {
  androidEnabled: boolean;
  iosEnabled: boolean;
};

export type CTSLicense = BaseLicense;

export type UIAutomatorLicense = BaseLicense;

export type License = {
  activateTime: number;
  android: AndroidLicense;
  build: BuildLicense;
  closeTime: number;
  desktop: DesktopLicense;
  expireTime: number;
  global: GlobalLicense;
  id: number;
  inspector: InspectorLicense;
  ios: IOSLicense;
  privateInstance: boolean;
  recorder: RecorderLicense;
  server: ServerLicense;
  status: LicenseStatus;
  userEmail: string;
  userId: number;
}

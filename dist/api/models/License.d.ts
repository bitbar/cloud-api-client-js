export declare enum LicenseStatus {
    ACTIVE = "ACTIVE",
    EXPIRED = "EXPIRED",
    INACTIVE = "INACTIVE",
    CLOSED = "CLOSED"
}
export declare type BaseLicense = {
    enabled: boolean;
};
export declare type FeatureLicense = {
    deviceLimit: number;
    deviceLimited: boolean;
    projectLimit: number;
    projectLimited: boolean;
};
export declare type AndroidLicense = BaseLicense & FeatureLicense & {
    cts: CTSLicense;
    uiAutomator: UIAutomatorLicense;
};
export declare type BuildLicense = BaseLicense & {
    limit: number;
    limited: boolean;
};
export declare type DesktopLicense = BaseLicense & FeatureLicense;
export declare type GlobalLicense = FeatureLicense;
export declare type InspectorLicense = BaseLicense;
export declare type IOSLicense = BaseLicense & FeatureLicense;
export declare type RecorderLicense = BaseLicense & {
    limit: number;
    limited: boolean;
};
export declare type ServerLicense = BaseLicense & {
    androidEnabled: boolean;
    iosEnabled: boolean;
};
export declare type CTSLicense = BaseLicense;
export declare type UIAutomatorLicense = BaseLicense;
export declare type License = {
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
};
export declare type LicenseData = Pick<License, 'privateInstance' | 'userId'> & {
    androidDeviceLimit: number;
    androidEnabled: boolean;
    androidProjectLimit: number;
    buildEnabled: boolean;
    buildLimit: number;
    desktopDeviceLimit: number;
    desktopEnabled: boolean;
    desktopProjectLimit: number;
    globalDeviceLimit: number;
    globalProjectLimit: number;
    inspectorEnabled: boolean;
    iosDeviceLimit: number;
    iosEnabled: boolean;
    iosProjectLimit: number;
    privateInstance: boolean;
    unit: string;
    unitCount: number;
};

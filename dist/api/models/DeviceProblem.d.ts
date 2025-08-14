export declare enum ProblemType {
    CLEANING = "CLEANING",
    DIRTY = "DIRTY",
    OFFLINE = "OFFLINE",
    LOW_BATTERY = "LOW_BATTERY",
    HIGH_FAIL_RATE = "HIGH_FAIL_RATE",
    NO_INTERNET_CONNECTION = "NO_INTERNET_CONNECTION"
}
export type DeviceProblem = {
    clusterId: number;
    clusterName: string;
    deviceId: number;
    deviceModelId: number;
    deviceModelName: string;
    deviceName: string;
    id: number;
    problems: Array<DeviceProblemPair>;
    location: string;
};
export type DeviceProblemPair = {
    id: number;
    type: ProblemType;
    value: any;
};

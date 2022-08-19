export declare enum SharedResourceType {
    DEVICE_GROUP = "DEVICE_GROUP",
    FILE = "FILE",
    PROJECT = "PROJECT"
}
export declare type SharedResource = {
    id: number;
    name: string;
    resourceId: number;
    type: SharedResourceType;
};

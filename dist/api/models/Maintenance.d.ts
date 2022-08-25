export declare type Maintenance = {
    enabled: boolean;
    id: number;
};
export declare enum MaintenanceType {
    BARE_METAL = "BARE_METAL",
    EC2 = "EC2",
    VM = "VM"
}
export declare type MaintenanceData = {
    enabled: boolean;
    type: MaintenanceType;
};

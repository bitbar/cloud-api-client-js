export declare enum BrokerType {
    MOBILE = "MOBILE",
    DESKTOP = "DESKTOP"
}
export declare type Broker = {
    id: number;
    location: string;
    type: BrokerType;
    url: string;
};

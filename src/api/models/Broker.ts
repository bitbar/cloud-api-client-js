export enum BrokerType {
  MOBILE = 'MOBILE',
  DESKTOP = 'DESKTOP'
}

export type Broker = {
  id: number;
  location: string;
  type: BrokerType;
  url: string
}

export enum BrokerEnum {
  MOBILE = 'MOBILE';
  DESKTOP = 'DESKTOP'
}

export type Broker = {
  id: number;
  location: string;
  type: BrokerEnum;
  url: string
}

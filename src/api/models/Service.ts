import {Role} from "./Role";

export type Service = {
  activateTime: number;
  activated: boolean;
  archiveTime: number;
  autoRenew: boolean;
  centPrice: number;
  chargeType: 'USAGE_MOBILE'| 'CONCURRENCY_MOBILE'| 'CONCURRENCY_DESKTOP';
  commonId: string;
  customPlan: boolean;
  defaultConcurrences: Array<number>;
  description: string;
  externalId: string;
  features: string;
  id: number;
  includedHours: number;
  name: string;
  pricePerHour: number;
  priceString: string;
  roles: Array<Role>;
  selfURI: string;
  unit: ServiceUnit;
}

export type ServiceUnit = 'MONTH' | 'DAY' | 'YEAR' | 'HOUR' | 'RUN' | 'PROJECT';

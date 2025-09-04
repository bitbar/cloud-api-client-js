import {CollectionQueryParams} from './HTTP';


export type Account = {
  activeServiceName: string,
  comment: string,
  createTime: number,
  dedicatedDevicesConcurrency: number,
  dedicatedDevicesCount: number,
  dedicatedDevicesRatio: number,
  dedicatedDevicesUsage: number,
  id: number,
  invoiceDetails: Invoice,
  name: string,
  publicDevicesConcurrency: number,
  publicDevicesRatio: number,
  publicDevicesUsage: number,
  slmOrganizationId: string,
  userName: string
}

export type Invoice = {
  address: string,
  city: string,
  code: string,
  country: string,
  state: string
}

export type AccountData = Partial<{
  comment: string,
  invoiceDetails: Invoice,
  name: string,
  slmOrganizationId: string;
  userName: string
}>

export type AccountUsageSummary = {
  sessionsCount: number,
  duration: number,
  deviceModelsCount: number,
  tunnelEnabledCount: number,
  osVersionsCount: number,
  projectsCount: number,
  usersCount: number,
}

export type AccountUsage = {
  timestamp: number,
  timestampLabel: string,
  sessionsCount: number,
  automatedConcurrency: number,
  automatedUsage: number,
  dedicatedConcurrency: number,
  dedicatedUsage: number,
  manualConcurrency: number,
  manualUsage: number
}

export type AccountSessionUsage = {
  createTime: number,
  duration: number,
  type: SessionUsageType,
  userId: number,
  userName: string
}

export type AccountSessionUsageSummary = {
  totalTime: number,
  usage: Record<SessionUsageType, number>
}

export enum SessionUsageType {
  AUTOMATIC = 'AUTOMATIC',
  MANUAL = 'MANUAL',
  DEDICATED_AUTOMATIC = 'DEDICATED_AUTOMATIC',
  DEDICATED_MANUAL = 'DEDICATED_MANUAL'
}

export enum UtilizationType {
  ALL = 'all',
  PUBLIC = 'public',
  DEDICATED = 'dedicated'
}

export enum SessionType {
  ALL = 'all',
  AUTOMATED = 'automated',
  MANUAL = 'manual'
}

export enum TimeResolution {
  HOUR = 'hour',
  DAY = 'day'
}

export type AccountUsageParams = CollectionQueryParams & {
  grouping?: TimeResolution,
  sessionType?: SessionType,
  utilizationType?: UtilizationType,
}

export type AccountUsageSummaryParams = CollectionQueryParams & {
  grouping?: TimeResolution,
}

export type Account = {
  activeServiceName: string;
  comment: string;
  createTime: number;
  dedicatedDevicesCount: number;
  id: number;
  invoiceDetails: Invoice
  name: string;
  slmOrganizationId: string;
  userName: string;
}

export type Invoice = {
  address: string,
  city: string,
  code: string,
  country: string,
  state: string,
  update: boolean
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

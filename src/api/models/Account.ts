export type Account = {
  activeServiceName: string;
  comment: string;
  createTime: number;
  dedicatedDevicesCount: number;
  id: number;
  invoiceDetails: Invoice
  name: string;
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

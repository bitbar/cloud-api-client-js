export type Property = {
  description: string;
  fromTime: number;
  id: number;
  name: string;
  toTime: number;
  updateTime: number;
  updatedByDisplayName: string;
  updatedById: number;
  value: string;
}
export type PropertyData = Pick<Property, 'description' | 'fromTime' | 'name' | 'toTime' | 'value'>;


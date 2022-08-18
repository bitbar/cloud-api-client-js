import {DeviceProperty} from './Device';

export type LabelGroup = {
  displayName: string;
  id: number;
  name: string;
}

export type LabelData = Pick<DeviceProperty, 'displayName' | 'name'>;

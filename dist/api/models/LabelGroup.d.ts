import { DeviceProperty } from './Device';
export declare type LabelGroup = {
    displayName: string;
    id: number;
    name: string;
};
export declare type LabelData = Pick<DeviceProperty, 'displayName' | 'name'>;

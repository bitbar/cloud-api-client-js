import { API } from '../API';
import { APIList } from './APIList';
import { APIResource } from './APIResource';
import { DeviceProperty } from './models/Device';
import { CollectionBasicQueryParams, NoQueryParams } from './models/HTTP';
import { LabelData, LabelGroup } from './models/LabelGroup';
export declare class APIResourceLabelGroup extends APIResource<LabelGroup> {
    constructor(parent: API, id: number);
    labels(): APIList<DeviceProperty, CollectionBasicQueryParams, LabelData>;
    label(id: number): APIResource<DeviceProperty, NoQueryParams, LabelData>;
}
export default APIResourceLabelGroup;

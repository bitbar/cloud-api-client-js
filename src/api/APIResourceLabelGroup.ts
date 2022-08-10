import {API} from '../API';
import {APIEntity} from './APIEntity';
import {APIList, CollectionBasicQueryParams, NoQueryParams} from './APIList'
import {APIResource} from './APIResource'
import {DeviceProperty} from './models/Device';
import {LabelGroup} from './models/LabelGroup';

export type LabelData = Pick<DeviceProperty, 'displayName' | 'name'>;

export class APIResourceLabelGroup extends APIResource<LabelGroup> {

  /**
   * /label-groups/{id}
   */
  constructor(parent: API, id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    super(parent);
    this.push('label-groups', id);
  }

  // /label-groups/{id}/labels
  labels() {
    return new APIList<DeviceProperty, CollectionBasicQueryParams, LabelData>(this).push('labels');
  }

  // /label-groups/{id}/labels/{id}
  label(id: number) {
    return new APIResource<DeviceProperty, NoQueryParams, LabelData>(this).push('labels', id);
  }

}

export default APIResourceLabelGroup

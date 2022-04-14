import {API} from '../API';
import {APIEntity} from './APIEntity';
import {APIList} from './APIList'
import {APIResource} from './APIResource'

/**
 * APIResourceLabelGroup
 *
 * @class
 * @extends APIResource
 */
export class APIResourceLabelGroup extends APIResource {

  /**
   * /label-groups/{id}
   *
   * Constructor
   */
  constructor(parent: APIEntity<any> | API, id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    super(parent);
    this.push('label-groups', id);
  }

  // /label-groups/{id}/labels
  labels() {
    return new APIList(this).push('labels');
  }

  // /label-groups/{id}/label
  label(id: number) {
    return new APIResource(this).push('labels', id);
  }

}

export default APIResourceLabelGroup

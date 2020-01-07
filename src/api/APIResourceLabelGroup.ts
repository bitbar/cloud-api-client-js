import APIResource from './APIResource'
import APIList from './APIList'


/**
 * APIResourceLabelGroup
 *
 * @class
 * @extends APIResource
 */
class APIResourceLabelGroup extends APIResource {

  /**
   * /label-groups/{id}
   *
   * Constructor
   */
  constructor (parent: object, id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    super(parent);
    this.push('label-groups', id);
  }

  // /label-groups/{id}/labels
  public labels () {
    return new APIList(this).push('labels');
  }

  // /label-groups/{id}/label
  public label (id: number) {
    return new APIResource(this).push('labels', id);
  }

}

export default APIResourceLabelGroup

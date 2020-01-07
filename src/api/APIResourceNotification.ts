import APIResource from './APIResource'


/**
 * APIResourceNotification
 *
 * @class
 * @extends APIResource
 */
class APIResourceNotification extends APIResource {

  /**
   * /notifications/{id}
   *
   * Constructor
   */
  constructor (parent: object, id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    super(parent);
    this.push('notifications', id);
  }

  // /notifications/{id}/test
  public test () {
    return new APIResource(this).push('test');
  }

}

export default APIResourceNotification

import APIList from './APIList';
import APIResource from './APIResource';
import OutputFileset from './class/OutputFileset';


/**
 * APIResourceDeviceSession
 *
 * @class
 * @extends APIResource
 */
class APIResourceDeviceSessionStandalone extends APIResource {

  /**
   * /device-sessions/{id}
   *
   * Constructor
   */
   constructor (parent: object, id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    super(parent);
    this.push('device-sessions', id);
  }

  // /device-sessions/{id}/connections
  public connections () {
    return new APIList(this).push('connections');
  }

  // /device-sessions/{id}/connections/{id}
  public connection (id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    return new APIResource(this).push('connections', id);
  }

  // /device-sessions/{id}/output-file-set
  public output () {
    return new OutputFileset(this);
  }

  // /device-sessions/{id}/release
  public release () {
    return new APIResource(this).push('release').post();
  }

}

export default APIResourceDeviceSessionStandalone

import DeviceSessionStandalone from './interface/DeviceSessionStandalone';
import APIList from './APIList';
import APIResource from './APIResource';

import InputFileset from './class/InputFileset';
import OutputFileset from './class/OutputFileset';


/**
 * APIResourceDeviceSession
 *
 * @class
 * @extends APIResource
 */
class APIResourceDeviceSessionStandalone extends APIResource implements DeviceSessionStandalone {

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

  // /device-sessions/{id}/input-file-set
  public input () {
    return new InputFileset(this);
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

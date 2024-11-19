import {APIAdminResourceUser} from './APIAdminResourceUser';
import {APIList} from './APIList';
import {APIResource} from './APIResource';
import {APIResourceUser} from './APIResourceUser';
import {InputFileset} from './class/InputFileset';
import {OutputFileset} from './class/OutputFileset';
import {DeviceSessionStandalone} from './interface/DeviceSessionStandalone';
import {Connection, ConnectionData} from './models/Connection';
import {DeviceSession, DeviceSessionRelease} from './models/DeviceSession';
import {CollectionBasicQueryParams, NoData, NoQueryParams} from './models/HTTP';
import {VisualTest} from './models/VisualTest';

export class APIResourceDeviceSessionStandalone extends APIResource<DeviceSession> implements DeviceSessionStandalone {

  /**
   * /device-sessions/{id}
   */
  constructor(parent: APIResourceUser | APIAdminResourceUser, id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    super(parent);
    this.push('device-sessions', id);
  }

  // /device-sessions/{id}/connections
  connections() {
    return new APIList<Connection, CollectionBasicQueryParams, ConnectionData>(this).push('connections');
  }

  // /device-sessions/{id}/connections/{id}
  connection(id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    return new APIResource<Connection, NoQueryParams, NoData>(this).push('connections', id);
  }

  // /device-sessions/{id}/input-file-set
  input() {
    return new InputFileset(this);
  }

  // /device-sessions/{id}/output-file-set
  output() {
    return new OutputFileset(this);
  }

  // /device-sessions/{id}/release
  release() {
    return new APIResource<DeviceSession, NoQueryParams, DeviceSessionRelease>(this).push('release').post();
  }

  // /device-sessions/{id}/visual-tests/images
  visualTestsImages() {
    return new APIList<VisualTest, NoQueryParams, NoData>(this).push('visual-tests', 'images');
  }

}

export default APIResourceDeviceSessionStandalone

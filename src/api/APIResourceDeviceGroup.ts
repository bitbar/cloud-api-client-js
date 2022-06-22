import {API} from '../API';
import {APIEntity} from './APIEntity';
import {APIList, CollectionBasicQueryParams} from './APIList'
import {APIResource} from './APIResource'
import {DeviceGroupData, DeviceGroupParams, DeviceGroupSelectorData, DeviceGroupSelectorIdData, DeviceGroupShareData} from './interface/DeviceGroupInterfaces';
import {Device, DeviceProperty} from './models/Device';
import {DeviceGroup} from "./models/DeviceGroup";
import {SharedResource} from './models/SharedResource';

export class APIResourceDeviceGroup extends APIResource<DeviceGroup> {

  /**
   * /device-groups/{id}
   */
  constructor(parent: APIEntity<any> | API, id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    super(parent);
    this.push('device-groups', id);
  }

  // /device-groups/{id}/devices
  devices() {
    return new APIList<Device | DeviceGroup, DeviceGroupParams, DeviceGroupData>(this).push('devices');
  }

  // /device-groups/{id}/devices/{id}
  device(id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    return new APIResource<void, void, void>(this).push('devices', id);
  }

  // /device-groups/{id}/selectors
  selectors() {
    return new APIList<DeviceProperty | DeviceGroup, CollectionBasicQueryParams, DeviceGroupSelectorData | DeviceGroupSelectorIdData>(this).push('selectors');
  }

  // /device-groups/{id}/selectors/{id}
  selector(id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    return new APIResource(this).push('selectors', id);
  }

  // /device-groups/{id}/share
  share() {
    return new APIResource<SharedResource, void, DeviceGroupShareData>(this).push('share');
  }

}

export default APIResourceDeviceGroup

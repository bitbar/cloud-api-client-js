import {API} from '../API';
import {NoData} from './APIEntity';
import {APIList} from './APIList';
import {APIResource} from './APIResource';
import {DesktopBrowserCapabilities} from './models/DesktopBrowserCapabilities';
import {Device} from './models/Device';
import {DevicePicker} from './models/DeviceFilter';
import {CollectionQueryParams, NoQueryParams} from './models/HTTP';


export interface DevicesQueryParams extends CollectionQueryParams {
  labelIds: Array<string>;
  liveTestingOnly: boolean;
  withBrowsers: boolean;
  withDedicated: boolean;
  withDisabled: boolean;
  withProperties: boolean;
  withSupportedCreators: boolean;
}

export class APIListDevices extends APIList<Device, DevicesQueryParams> {

  /**
   * /devices
   */
  constructor(parent: API) {
    super(parent);
    this.push('devices');
  }

  // /devices/filters
  filters() {
    return new APIResource<DevicePicker, CollectionQueryParams, NoData>(this).push('filters');
  }

  // /devices/desktop-browser-capabilities
  desktopBrowserCapabilities() {
    return new APIResource<DesktopBrowserCapabilities, NoQueryParams, NoData>(this).push('desktop-browser-capabilities');
  }

}

export default APIListDevices;

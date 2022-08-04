import {API} from "../API";
import {APIList, CollectionQueryParams, NoQueryParams} from './APIList';
import {APIResource} from './APIResource';
import {DesktopBrowserCapabilities} from "./models/DesktopBrowserCapabilities";
import {Device} from "./models/Device";
import {DevicePicker} from "./models/DeviceFilter";


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
    return new APIResource<DevicePicker, CollectionQueryParams, void>(this).push('filters');
  }

  // /devices/desktop-browser-capabilities
  desktopBrowserCapabilities() {
    return new APIResource<DesktopBrowserCapabilities, NoQueryParams, void>(this).push('desktop-browser-capabilities');
  }

}

export default APIListDevices;

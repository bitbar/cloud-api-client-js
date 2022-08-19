import {API} from '../API';
import {APIList} from './APIList';
import {APIResource} from './APIResource';
import {DesktopBrowserCapabilities} from './models/DesktopBrowserCapabilities';
import {Device, DevicesQueryParams} from './models/Device';
import {DevicePicker} from './models/DeviceFilter';
import {CollectionQueryParams, NoData, NoQueryParams} from './models/HTTP';


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

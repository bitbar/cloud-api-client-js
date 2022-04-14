import {API} from "../API";
import {APIList} from './APIList';
import {APIResource} from './APIResource';
import {Device} from "./models/Device";


export class APIListDevices extends APIList<Device> {

  /**
   * /devices
   */
  constructor(parent: API) {
    super(parent);
    this.push('devices');
  }

  // /devices/filters
  filters() {
    return new APIResource(this).push('filters');
  }

  // /devices/desktop-browser-capabilities
  desktopBrowserCapabilities() {
    return new APIResource(this).push('desktop-browser-capabilities');
  }

}

export default APIListDevices;

import {Screenshot} from './models/Screenshot';
import {CollectionBasicQueryParams, NoData} from './models/HTTP';
import APIList from './APIList';
import APIResourceDeviceSessionCommon from './APIResourceDeviceSessionCommon';


export class APIListScreenshots extends APIList<Screenshot, CollectionBasicQueryParams, NoData> {

  /**
   * screenshots
   */
  constructor(parent: APIResourceDeviceSessionCommon) {
    super(parent);
    this.push('screenshots');
  }
}

export default APIListScreenshots

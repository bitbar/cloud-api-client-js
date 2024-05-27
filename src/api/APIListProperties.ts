import {API} from '../API';
import {APIList} from './APIList';
import {CollectionQueryParams} from './models/HTTP';
import {Property, PropertyData} from './models/Property';


export class APIListProperties extends APIList<Property, CollectionQueryParams, PropertyData> {

  /**
   * /properties
   */
  constructor(parent: API) {
    super(parent);
    this.push('properties');
  }

  maintenance() {
    return new APIList(this).params({
      filter: 'name_eq_CLOUD_HEADER_ANNOUNCEMENT',
      limit: 1,
      sort: 'updateTime_d'
    });
  }

}

export default APIListProperties

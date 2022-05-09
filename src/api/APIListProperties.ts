import {API} from '../API';
import {APIList, CollectionQueryParams} from './APIList'
import {Property} from "./models/Property";

export type PropertyData = Pick<Property, 'description' | 'fromTime' | 'name' | 'toTime' | 'value'>;

export interface AppBansQueryParams {
  testRunId: number;
}

export type AppBansData = AppBansQueryParams;

export class APIListProperties extends APIList<Property, CollectionQueryParams, PropertyData> {

  /**
   * /properties
   */
  constructor(parent: API) {
    super(parent);
    this.push('properties');
  }

  // /properties/app-bans?testRunId=id
  appBan(id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    return new APIList<Property, AppBansQueryParams, AppBansData>(this).push('app-bans').params({
      testRunId: id
    });
  }

}

export default APIListProperties

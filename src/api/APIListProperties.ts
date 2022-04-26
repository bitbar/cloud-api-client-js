import {API} from '../API';
import {APIList} from './APIList'
import {Property} from "./models/Property";


export class APIListProperties extends APIList<Property> {

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

    this.push('app-bans').params({
      testRunId: id
    });
  }

}

export default APIListProperties

import APIList from './APIList'


/**
 * APIListProperties
 *
 * @class
 * @extends APIList
 */
class APIListProperties extends APIList {

  /**
   * /properties
   *
   * Constructor
   */
  constructor (parent: object) {
    super(parent);
    this.push('properties');
  }

  // /properties/app-bans?testRunId=id
  public appBan (id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    this.push('app-bans').params({
      testRunId: id
    });
  }

}

export default APIListProperties

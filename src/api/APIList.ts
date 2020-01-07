import APIEntity from './APIEntity'
import FilterBuilder from '../FilterBuilder'


/**
 * Default limit
 *
 * @constant
 * @type {number}
 * @default
 */
const DEFAULT_LIMIT: number = 20;

/**
 * Default offset
 *
 * @constant
 * @type {number}
 * @default
 */
const DEFAULT_OFFSET: number = 0;

/**
 * API Order Enum
 */
enum APIOrder {
  'asc' = 'a',
  'desc' = 'd'
};


/**
 * APIList
 *
 * @class
 * @extends APIEntity
 */
class APIList extends APIEntity {

  /**
   * Create
   * Shortcut for sending data POST
   *
   * @param {object} data
   */
  public create (data: object) {
    return this.post().data(data).send();
  }

  /**
   * Sets sorting
   *
   * @public
   * @param {string} name - Name of the column according to which the data will be sorted
   * @param {string} [order=a] - Sorting order. Possibilities: 'a', 'd'
   * @returns this
   */
  public sort (name: string, order: APIOrder = APIOrder.asc) {
    // if order not in ['a', 'd']
    //   throw new Error(`Order '\${order}' is invalid! Use 'a' for ascending or 'd' for descending.`);

    return this.params({
      sort: `${name}_${order}`
    });
  }

  /**
   * Sets limit
   *
   * @public
   * @param {number} [limit=DEFAULT_LIMIT] - Limit to be set
   * @returns this
   */
  public limit (limit = DEFAULT_LIMIT) {
    if (!Number.isNatural(limit)) {
      throw new Error(`Limit '${limit}' is invalid!`);
    }

    return this.params({
      limit
    });
  }

  /**
   * Gets limit
   *
   * @public
   * @returns number
   */
  public getLimit () {
    var params = this.getParams();
    return params.limit == null ? DEFAULT_LIMIT : params.limit;
  }

  /**
   * Disables limit
   *
   * @public
   * @returns this
   */
  public noLimit () {
    return this.limit(0);
  }

  /**
   * Sets offset
   *
   * @public
   * @param {number} [offset=DEFAULT_OFFSET] - Offset to be set
   * @returns this
   */
  public offset (offset: number = DEFAULT_OFFSET) {
    if (!Number.isNatural(offset)) {
      throw new Error(`Offset '${offset}' is invalid!`);
    }

    return this.params({
      offset
    });
  }

  /**
   * Sets limit and offset so that will request from BE records between range
   *
   * @public
   * @param {number} from - From index
   * @param {number} to - To index
   * @returns this
   */
  public between (from: number, to: number) {
    if (!Number.isNatural(from)) {
      throw new Error(`From '${from}' is invalid!`);
    }

    if (!Number.isNatural(to)) {
      throw new Error(`To '${to}' is invalid!`);
    }

    return this.params({
      offset: from,
      limit: 1 + (to - from)
    });
  }

  /**
   * Sets limit and offset so that will request from BE one record on given index
   *
   * @public
   * @param {number} idx - Index
   * @returns this
   */
  public only (idx: number) {
    if (!Number.isNatural(idx)) {
      throw new Error(`Index '${idx}' is invalid!`);
    }

    return this.params({
      offset: idx,
      limit: 1
    });
  }

  /**
   * Gets current limit and sets offset so that will request from BE one page of records
   *
   * @public
   * @param {number} [page=1] - Page number (counted from 1)
   * @returns this
   */
  public page (page: number = 1) {
    if (!Number.isNatural(page) || page == 0) {
      throw new Error(`Page '${page}' is invalid!`);
    }

    var limit = this.getLimit();
    var offset = (page - 1) * limit;

    return this.params({
      offset,
      limit
    });
  }

  /**
   * Sets search
   *
   * query param is working like SQL LIKE. BE sets wraps around query with %, and replaces every white character
   * with %. So e.g. if query='my device', then it's searching for '%my%device%' in DB.
   *
   * @public
   * @param {string} query - Query to search for
   * @returns this
   */
  public search (query: string) {
    if (typeof query !== 'string') {
      throw new Error('Search query must be a string!');
    }

    return this.params({
      search: query
    });
  }

  /**
   * Sets filter
   *
   * @public
   * @param {FilterBuilder|string} filter - Filter
   * @returns this
   */
  public filter (filter: FilterBuilder | string) {
    var isFilterBuilder = filter instanceof FilterBuilder;

    if (typeof filter !== 'string' && !isFilterBuilder) {
      throw new Error('Filter must be either string or instance of FilterBuilder');
    }

    if (isFilterBuilder) {
      filter = filter.toString();
    }

    return this.params({
      filter
    });
  }
}

interface APIList {

  /**
   * Alias for 'noLimit'
   *
   * @public
   * @see noLimit
   * @returns this
   */
  all: typeof APIList.prototype.noLimit;

  /**
   * Alias for 'between'
   *
   * @public
   * @param {number} from - From idx
   * @param {number} to - To idx
   * @returns this
   */
  cut: typeof APIList.prototype.between;
}

export default APIList;

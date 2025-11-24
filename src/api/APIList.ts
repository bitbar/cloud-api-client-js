import {AxiosResponse} from 'axios';
import {FilterBuilder} from '../FilterBuilder'
import {APIEntity} from './APIEntity'
import {
  APIOrder,
  CollectionBasicQueryParams,
  CollectionQueryParams,
  CollectionResponse,
  NoQueryParams,
  SimpleCollectionResponse
} from './models/HTTP';


export const DEFAULT_LIMIT: number = 20;
export const DEFAULT_OFFSET: number = 0;

export type APIListQuery = CollectionBasicQueryParams | CollectionQueryParams | NoQueryParams;

export class APIList<RESPONSE = any, QUERY_PARAMS extends APIListQuery = CollectionQueryParams, DATA = any>
  extends APIEntity<CollectionResponse<RESPONSE> | SimpleCollectionResponse<RESPONSE>, QUERY_PARAMS, DATA> {

  /**
   * Shortcut for sending data POST
   */
  create(data: DATA): Promise<AxiosResponse<RESPONSE>> {
    return this.post().data(data).send<RESPONSE>();
  }

  /**
   * Sets sorting
   *
   * @public
   * @param {string} name - Name of the column according to which the data will be sorted
   * @param {string} [order=a] - Sorting order. Possibilities: 'a', 'd'
   */
  sort(name: string, order: APIOrder = APIOrder.asc): this {
    return this.params<'sort'>({
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
  limit(limit = DEFAULT_LIMIT): this {
    if (!Number.isNatural(limit)) {
      throw new Error(`Limit '${limit}' is invalid!`);
    }

    return this.params<'limit'>({
      limit
    });
  }

  /**
   * Gets limit
   *
   * @public
   * @returns number
   */
  getLimit(): number {
    const params = this.getParams();
    return params.limit == null ? DEFAULT_LIMIT : <number>params.limit;
  }

  /**
   * Disables limit
   *
   * @public
   * @returns this
   */
  noLimit(): this {
    return this.limit(0);
  }

  /**
   * Sets offset
   *
   * @public
   * @param {number} [offset=DEFAULT_OFFSET] - Offset to be set
   * @returns this
   */
  offset(offset: number = DEFAULT_OFFSET): this {
    if (!Number.isNatural(offset)) {
      throw new Error(`Offset '${offset}' is invalid!`);
    }

    return this.params<'offset'>({
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
  between(from: number, to: number): this {
    if (!Number.isNatural(from)) {
      throw new Error(`From '${from}' is invalid!`);
    }

    if (!Number.isNatural(to)) {
      throw new Error(`To '${to}' is invalid!`);
    }

    return this.params<'offset' | 'limit'>({
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
  only(idx: number): this {
    if (!Number.isNatural(idx)) {
      throw new Error(`Index '${idx}' is invalid!`);
    }

    return this.params<'offset' | 'limit'>({
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
  page(page = 1): this {
    if (!Number.isNatural(page) || page == 0) {
      throw new Error(`Page '${page}' is invalid!`);
    }

    const limit = this.getLimit();
    const offset = (page - 1) * limit;

    return this.params<'offset' | 'limit'>({
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
  search(query: string): this {
    if (typeof query !== 'string') {
      throw new Error('Search query must be a string!');
    }

    return this.params<'search'>({
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
  filter(filter: FilterBuilder | string): this {
    const isFilterBuilder = filter instanceof FilterBuilder;

    if (typeof filter !== 'string' && !isFilterBuilder) {
      throw new Error('Filter must be either string or instance of FilterBuilder');
    }

    return this.params<'filter'>({
      filter: filter.toString()
    });
  }

  /**
   * Alias for 'noLimit'
   *
   * @public
   * @see noLimit
   * @returns this
   */
  all: typeof APIList.prototype.noLimit = this.noLimit;

  /**
   * Alias for 'between'
   *
   * @public
   * @param {number} from - From idx
   * @param {number} to - To idx
   * @returns this
   */
  cut: typeof APIList.prototype.between = this.between;
}

export default APIList;

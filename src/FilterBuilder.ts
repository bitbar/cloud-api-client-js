import {Filter} from './Filter';
import './finka';

/**
 * FilterBuilder
 *
 * Builds filter string according to Bitbar Cloud backend convention
 */
export class FilterBuilder {

  private readonly filters: Array<Filter> = [];

  gt(name: string, value: number): this {
    return this.add(name, value, 'gt');
  }


  lt(name: string, value: number): this {
    return this.add(name, value, 'lt');
  }

  after(name: string, value: Date | number): this {
    return this.add(name, value, 'after', true);
  }

  afterorequal(name: string, value: Date | number): this {
    return this.add(name, value, 'afterorequal', true);
  }

  before(name: string, value: Date | number): this {
    return this.add(name, value, 'before', true);
  }

  beforeorequal(name: string, value: Date | number): this {
    return this.add(name, value, 'beforeorequal', true);
  }

  on(name: string, value: any): this {
    return this.add(name, value, 'on');
  }

  eq(name: string, value: any): this {
    return this.add(name, value, 'eq');
  }

  contains(name: string, value: string): this {
    return this.add(name, value, 'contains');
  }

  like(name: string, value: string): this {
    return this.add(name, value, 'like');
  }

  notlike(name: string, value: string): this {
    return this.add(name, value, 'notlike');
  }

  isnull(name: string): this {
    return this.add(name, undefined, 'isnull');
  }

  isnotnull(name: string): this {
    return this.add(name, undefined, 'isnotnull');
  }

  in(name: string, value: Array<any>): this {
    return this.add(name, value, 'in', true);
  }

  notin(name: string, value: Array<any>): this {
    return this.add(name, value, 'notin', true);
  }

  raw(filter: Filter | string | Filter[] | string[]): void {
    const filters = Array.wrap(filter);
    for (const filter of filters) {
      if (this.isFilterPart(filter)) {
        this.filters.push(filter);
      } else {
        throw new SyntaxError(`Filter ${filter} has invalid syntax`);
      }
    }
  }


  /**
   * Check if given string is proper filter part
   */
  isFilterPart(str: string): boolean {
    return /^[a-zA-Z0-9.]{2,12}_(?:isnull$|(?:gt|lt|(?:after|before)(?:orequal)?|on|eq|contains|like|(?:not)?in)_)/.test(<string>str);
  }

  toString(): string {
    const parts: Array<string> = [];

    let part: string,
      val: string;

    for (const filter of this.filters) {
      if (typeof filter === 'string') {
        part = filter;
      } else {
        val = '';
        if (filter.value.length > 1 || typeof filter.value[0] !== 'undefined') {
          val = `_${filter.value.join('|')}`;
        }
        part = `${filter.name}_${filter.operand}${val}`;
      }
      parts.push(part);
    }

    return parts.join(';');
  }

  /**
   * Add filter to filters list
   * @param name {string} Name
   * @param value {*} Value
   * @param operand {string} Operand
   * @param [checkNull=false] {boolean} Check null?
   * @returns {FilterBuilder}
   */
  private add<T = any>(name: string, value: T, operand: string, checkNull = false): this {

    let _value = Array.wrap(value);

    if (_value.length === 0) {
      return this;
    }

    // auto-convert
    for (let i = 0; i < _value.length; i++) {
      const v = _value[i];
      if (typeof v === 'object' && v instanceof Date) {
        _value[i] = v.getTime();
      }
    }

    let isNull = false;
    if (checkNull) {
      // check null existence
      for (const v of _value) {
        if (v !== null) {
          continue;
        }
        isNull = true;
      }

      if (isNull) {
        _value = _value.filter((item: any) => item !== null);
        operand += 'ornull';
      }
    }

    if (operand.endsWith('ornull') && _value.length === 0) {
      operand = 'isnull';
    }

    // add filter
    this.filters.push(new Filter<Array<T>>(name, _value, operand));

    return this;
  }
}


export default FilterBuilder;

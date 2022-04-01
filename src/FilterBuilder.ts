import {Filter} from './Filter';
import './finka';

/**
 * FilterBuilder
 *
 * Builds filter string according to Bitbar Cloud backend convention
 */
export class FilterBuilder {

  private readonly filters: Array<Filter> = [];

  /**
   * Add filter to filters list
   * @param name {string} Name
   * @param value {*} Value
   * @param operand {string} Operand
   * @param [checkNull=false] {boolean} Check null?
   * @returns {FilterBuilder}
   */
  private add<T = any>(name: string, value: T, operand: string, checkNull = false): FilterBuilder {

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
          isNull = true;
        }
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


  public gt(name: string, value: number) {
    return this.add(name, value, 'gt');
  }

  public lt(name: string, value: number) {
    return this.add(name, value, 'lt');
  }

  public after(name: string, value: Date | number) {
    return this.add(name, value, 'after', true);
  }

  public afterorequal(name: string, value: Date | number) {
    return this.add(name, value, 'afterorequal', true);
  }

  public before(name: string, value: Date | number) {
    return this.add(name, value, 'before', true);
  }

  public beforeorequal(name: string, value: Date | number) {
    return this.add(name, value, 'beforeorequal', true);
  }

  public on(name: string, value: any) {
    return this.add(name, value, 'on');
  }

  public eq(name: string, value: any) {
    return this.add(name, value, 'eq');
  }

  public contains(name: string, value: string) {
    return this.add(name, value, 'contains');
  }

  public like(name: string, value: string) {
    return this.add(name, value, 'like');
  }

  public notlike(name: string, value: string) {
    return this.add(name, value, 'notlike');
  }

  public isnull(name: string) {
    return this.add(name, undefined, 'isnull');
  }

  public in(name: string, value: Array<any>) {
    return this.add(name, value, 'in', true);
  }

  public notin(name: string, value: Array<any>) {
    return this.add(name, value, 'notin', true);
  }


  public raw(filter: Filter | string | Filter[] | string[]) {
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
  public isFilterPart(str: string) {
    return /^[a-zA-Z0-9.]{2,12}_(?:isnull$|(?:gt|lt|(?:after|before)(?:orequal)?|on|eq|contains|like|(?:not)?in)_)/.test(<string>str);
  }

  /**
   * To string
   */
  public toString() {
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
}


export default FilterBuilder;

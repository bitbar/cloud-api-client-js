/**
 * Filter
 */

export class Filter<T = any> {
  name: string;
  value: T;
  operand: string;

  constructor(name: string, value: T, operand: string) {
    this.name = name;
    this.value = value;
    this.operand = operand;
  }
}

export default Filter;

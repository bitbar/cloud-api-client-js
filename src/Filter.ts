/**
 * Filter
 */

export class Filter<T = any> {
  public name: string;
  public value: T;
  public operand: string;

  constructor(name: string, value: T, operand: string) {
    this.name = name;
    this.value = value;
    this.operand = operand;
  }
}

export default Filter;

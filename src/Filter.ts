/**
 * Filter
 */

class Filter {
  public name: string;
  public value: any;
  public operand: string;

  constructor (name: string, value: any, operand: string) {
    this.name = name;
    this.value = value;
    this.operand = operand;
  }
}

export default Filter;

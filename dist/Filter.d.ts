export declare class Filter<T = any> {
    name: string;
    value: T;
    operand: string;
    constructor(name: string, value: T, operand: string);
}
export default Filter;

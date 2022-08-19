import { Filter } from './Filter';
import './finka';
export declare class FilterBuilder {
    private readonly filters;
    gt(name: string, value: number): this;
    lt(name: string, value: number): this;
    after(name: string, value: Date | number): this;
    afterorequal(name: string, value: Date | number): this;
    before(name: string, value: Date | number): this;
    beforeorequal(name: string, value: Date | number): this;
    on(name: string, value: any): this;
    eq(name: string, value: any): this;
    contains(name: string, value: string): this;
    like(name: string, value: string): this;
    notlike(name: string, value: string): this;
    isnull(name: string): this;
    in(name: string, value: Array<any>): this;
    notin(name: string, value: Array<any>): this;
    raw(filter: Filter | string | Filter[] | string[]): void;
    isFilterPart(str: string): boolean;
    toString(): string;
    private add;
}
export default FilterBuilder;

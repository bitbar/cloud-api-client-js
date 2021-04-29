import './finka';
import Filter from './Filter';
declare class FilterBuilder {
    private filters;
    constructor();
    private add;
    gt(name: string, value: number): FilterBuilder;
    lt(name: string, value: number): FilterBuilder;
    after(name: string, value: Date | number): FilterBuilder;
    afterorequal(name: string, value: Date | number): FilterBuilder;
    before(name: string, value: Date | number): FilterBuilder;
    beforeorequal(name: string, value: Date | number): FilterBuilder;
    on(name: string, value: any): FilterBuilder;
    eq(name: string, value: any): FilterBuilder;
    contains(name: string, value: string): FilterBuilder;
    like(name: string, value: string): FilterBuilder;
    notlike(name: string, value: string): FilterBuilder;
    isnull(name: string): FilterBuilder;
    in(name: string, value: Array<any>): FilterBuilder;
    notin(name: string, value: Array<any>): FilterBuilder;
    raw(filter: Filter): void;
    isFilterPart(str: string): boolean;
    toString(): string;
}
export default FilterBuilder;

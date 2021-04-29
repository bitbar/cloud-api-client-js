import APIEntity from './APIEntity';
import FilterBuilder from '../FilterBuilder';
declare enum APIOrder {
    'asc' = "a",
    'desc' = "d"
}
declare class APIList extends APIEntity {
    create(data: object): any;
    sort(name: string, order?: APIOrder): this;
    limit(limit?: number): this;
    getLimit(): any;
    noLimit(): this;
    offset(offset?: number): this;
    between(from: number, to: number): this;
    only(idx: number): this;
    page(page?: number): this;
    search(query: string): this;
    filter(filter: FilterBuilder | string): this;
}
interface APIList {
    all: typeof APIList.prototype.noLimit;
    cut: typeof APIList.prototype.between;
}
export default APIList;

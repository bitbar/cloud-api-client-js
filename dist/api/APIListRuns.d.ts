import APIList from './APIList';
import APIResource from './APIResource';
declare class APIListRuns extends APIList {
    constructor(parent: object);
    config(): APIResource;
}
export default APIListRuns;

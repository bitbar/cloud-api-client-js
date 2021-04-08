import APIResource from './APIResource';
import APIList from './APIList';
declare class APIResourceLabelGroup extends APIResource {
    constructor(parent: object, id: number);
    labels(): APIList;
    label(id: number): APIResource;
}
export default APIResourceLabelGroup;

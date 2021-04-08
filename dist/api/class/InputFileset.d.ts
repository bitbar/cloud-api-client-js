import APIResource from '../APIResource';
import APIList from '../APIList';
declare class InputFileset extends APIResource {
    constructor(parent: object);
    files(): APIList;
    filesZip(): APIResource;
}
export default InputFileset;

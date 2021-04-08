import APIList from './APIList';
declare class APIListNotifications extends APIList {
    constructor(parent: object);
    scopes(): APIList;
    channels(): APIList;
}
export default APIListNotifications;

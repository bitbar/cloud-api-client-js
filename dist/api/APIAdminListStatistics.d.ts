import APIList from './APIList';
declare class APIAdminListStatistics extends APIList {
    constructor(parent: object);
    deviceSessions(): APIList;
    frameworks(): APIList;
}
export default APIAdminListStatistics;

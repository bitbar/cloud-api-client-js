import APIList from './APIList';
declare class APIAdminListNotificationPlans extends APIList {
    constructor(parent: object);
    channels(): APIList;
    scopes(): APIList;
}
export default APIAdminListNotificationPlans;

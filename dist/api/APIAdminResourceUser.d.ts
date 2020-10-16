import APIResource from './APIResource';
import APIList from './APIList';
declare class APIAdminResourceUser extends APIResource {
    constructor(parent: object, id: number);
    accountRoles(): APIList;
    accountRole(): APIResource;
    accountServices(): APIList;
    disable(): APIResource;
    enable(): APIResource;
    licenses(): APIList;
    resendActivation(): APIResource;
    updateAccount(): APIResource;
}
export default APIAdminResourceUser;

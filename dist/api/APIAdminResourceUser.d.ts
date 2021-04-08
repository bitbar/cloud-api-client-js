import APIResource from './APIResource';
import APIList from './APIList';
import APIAdminResourceUserAccount from './APIAdminResourceUserAccount';
declare class APIAdminResourceUser extends APIResource {
    constructor(parent: object, id: number);
    disable(): APIResource;
    enable(): APIResource;
    licenses(): APIList;
    resendActivation(): APIResource;
    account(): APIAdminResourceUserAccount;
}
export default APIAdminResourceUser;

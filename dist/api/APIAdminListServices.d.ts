import APIList from './APIList';
import APIListPurchased from './APIListPurchased';
declare class APIAdminListServices extends APIList {
    constructor(parent: object);
    purchased(): APIListPurchased;
    available(): APIList;
    active(): APIList;
    activated(): APIList;
    inUse(): APIList;
    byPrice(): APIList;
}
export default APIAdminListServices;

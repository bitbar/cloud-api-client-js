import APIList from './APIList';
import APIListPurchased from './APIListPurchased';
declare class APIListServices extends APIList {
    constructor(parent: object);
    purchased(): APIListPurchased;
    available(): void;
}
export default APIListServices;

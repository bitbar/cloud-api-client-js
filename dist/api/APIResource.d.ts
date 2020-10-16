import APIEntity from './APIEntity';
declare class APIResource extends APIEntity {
    delete(): this;
}
interface APIResource {
    update: typeof APIResource.prototype.post;
}
export default APIResource;

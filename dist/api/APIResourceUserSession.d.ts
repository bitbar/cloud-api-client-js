import APIResource from './APIResource';
declare class APIResourceUserSession extends APIResource {
    constructor(parent: object);
    login(data: object): APIResource;
    logout(): APIResource;
    sso(name: string): APIResource;
    portalLogin(): APIResource;
}
export default APIResourceUserSession;

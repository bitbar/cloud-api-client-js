import { API } from '../API';
import { APIResource } from './APIResource';
import { NoQueryParams } from './models/HTTP';
import { LoginData, User } from './models/User';
export declare class APIResourceUserSession extends APIResource {
    constructor(parent: API);
    login(data: LoginData): APIResource<User, NoQueryParams, LoginData>;
    logout(): APIResource<any, import("./models/HTTP").QueryParams, import("./models/HTTP").QueryParams>;
    sso(name: string): APIResource<any, import("./models/HTTP").QueryParams, import("./models/HTTP").QueryParams>;
    portalLogin(): APIResource<any, import("./models/HTTP").QueryParams, import("./models/HTTP").QueryParams>;
    sbidCallbackUrl(): string;
}
export default APIResourceUserSession;

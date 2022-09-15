import { AxiosInstance } from 'axios';
import { APIAdminResource } from './api/APIAdminResource';
import { APIAdminResourceCluster } from './api/APIAdminResourceCluster';
import { APIList } from './api/APIList';
import { APIListDevices } from './api/APIListDevices';
import { APIListProperties } from './api/APIListProperties';
import { APIListServices } from './api/APIListServices';
import { APIListUsers } from './api/APIListUsers';
import { APIResource } from './api/APIResource';
import { APIResourceAccount } from './api/APIResourceAccount';
import { APIResourceBroker } from './api/APIResourceBroker';
import { APIResourceDevice } from './api/APIResourceDevice';
import { APIResourceDeviceGroup } from './api/APIResourceDeviceGroup';
import { APIResourceDeviceSession } from './api/APIResourceDeviceSession';
import { APIResourceFile } from './api/APIResourceFile';
import { APIResourceLabelGroup } from './api/APIResourceLabelGroup';
import { APIResourceProject } from './api/APIResourceProject';
import { APIResourceRun } from './api/APIResourceRun';
import { APIResourceUser } from './api/APIResourceUser';
import { APIResourceUserSession } from './api/APIResourceUserSession';
import { Cluster } from './api/models/Cluster';
import { NoQueryParams } from './api/models/HTTP';
import { License } from './api/models/License';
import { Project } from './api/models/Project';
import { Property } from './api/models/Property';
import { UserFile, UserFileData, UserFileParams } from './api/models/UserFile';
import { ApiConfig } from './ApiConfig';
import './finka';
export declare class API {
    private config;
    axios: AxiosInstance;
    private axiosConfig;
    get baseUrl(): string;
    constructor(config: ApiConfig);
    account(id: number): APIResourceAccount;
    admin(): APIAdminResource;
    broker(): APIResourceBroker;
    clusters(): APIList<Cluster, import("./api/models/HTTP").CollectionQueryParams, any>;
    cluster(id: number): APIAdminResourceCluster;
    device(id: number): APIResourceDevice;
    deviceGroup(id: number): APIResourceDeviceGroup;
    deviceGroups(): APIList<any, import("./api/models/HTTP").CollectionQueryParams, any>;
    devices(): APIListDevices;
    deviceSession(id: number): APIResourceDeviceSession;
    deviceSessions(): APIList<any, import("./api/models/HTTP").CollectionQueryParams, any>;
    deviceStatistics(): APIList<any, import("./api/models/HTTP").CollectionQueryParams, any>;
    enums(): APIResource<any, import("./api/models/HTTP").QueryParams, import("./api/models/HTTP").QueryParams>;
    files(): APIList<UserFile, UserFileParams, UserFileData>;
    file(id: number): APIResourceFile;
    labelGroups(): APIList<any, import("./api/models/HTTP").CollectionQueryParams, any>;
    labelGroup(id: number): APIResourceLabelGroup;
    labels(): APIList<any, import("./api/models/HTTP").CollectionQueryParams, any>;
    licenses(): APIResource<any, import("./api/models/HTTP").QueryParams, import("./api/models/HTTP").QueryParams>;
    license(): APIResource<License, NoQueryParams, void>;
    ma(): APIAdminResource | APIResourceUser;
    me(): APIResourceUser;
    projects(): APIList<Project, import("./api/models/HTTP").CollectionQueryParams, any>;
    project(id: number): APIResourceProject;
    properties(): APIListProperties;
    property(id: number): APIResource<Property, import("./api/models/HTTP").QueryParams, import("./api/models/HTTP").QueryParams>;
    run(id: number): APIResourceRun;
    services(): APIListServices;
    user(id: number | 'me'): APIResourceUser;
    users(): APIListUsers;
    userSession(): APIResourceUserSession;
}
export default API;

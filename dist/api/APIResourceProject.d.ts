import { API } from '../API';
import { APIAdminResource } from './APIAdminResource';
import { APIList } from './APIList';
import { APIResource } from './APIResource';
import { APIResourceRun } from './APIResourceRun';
import { APIResourceUser } from './APIResourceUser';
import { CollectionBasicQueryParams } from './models/HTTP';
import { Project } from './models/Project';
import { TestRun } from './models/TestRun';
export declare class APIResourceProject extends APIResource<Project> {
    constructor(parent: API | APIAdminResource | APIResourceUser, id: number);
    runs(): APIList<TestRun, CollectionBasicQueryParams, void>;
    run(id: number): APIResourceRun;
}
export default APIResourceProject;

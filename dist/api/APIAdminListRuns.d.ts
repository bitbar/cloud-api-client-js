import { Method } from 'axios';
import { APIAdminResource } from './APIAdminResource';
import { APIList } from './APIList';
import { APIResource } from './APIResource';
import { AdminTestRun, RunsConfigParams } from './models/AdminTestRun';
import { TestRunConfig } from './models/TestRun';
export declare class APIAdminListRuns extends APIList<AdminTestRun> {
    protected ALLOWED_HTTP_METHODS: Array<Method>;
    constructor(parent: APIAdminResource);
    config(): APIResource<TestRunConfig, RunsConfigParams, {
        configuration: TestRunConfig;
    }>;
}
export default APIAdminListRuns;

import { APIList } from './APIList';
import { APIResource } from './APIResource';
import { APIResourceUser } from './APIResourceUser';
import { RunsConfigParams, TestRun, TestRunConfig, TestRunsQueryParams } from './models/TestRun';
export declare class APIListRuns extends APIList<TestRun, TestRunsQueryParams, TestRunConfig> {
    constructor(parent: APIResourceUser);
    config(): APIResource<TestRunConfig, RunsConfigParams, TestRunConfig>;
}
export default APIListRuns;

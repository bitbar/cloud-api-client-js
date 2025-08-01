import { APIList } from './APIList';
import { APIResource } from './APIResource';
import { APIResourceUser } from './APIResourceUser';
import { RunsConfigParams, TestRun, TestRunConfig, TestRunsConfigData, TestRunsData, TestRunsQueryParams } from './models/TestRun';
export declare class APIListRuns extends APIList<TestRun, TestRunsQueryParams, TestRunsData> {
    constructor(parent: APIResourceUser);
    config(): APIResource<TestRunConfig, RunsConfigParams, TestRunsConfigData>;
}
export default APIListRuns;

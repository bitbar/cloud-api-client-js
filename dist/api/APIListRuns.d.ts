import { APIList } from './APIList';
import { APIResource } from './APIResource';
import { APIResourceUser } from './APIResourceUser';
import { NoQueryParams } from './models/HTTP';
import { TestRun, TestRunConfig, TestRunsConfigData, TestRunsData, TestRunsQueryParams } from './models/TestRun';
export declare class APIListRuns extends APIList<TestRun, TestRunsQueryParams, TestRunsData> {
    constructor(parent: APIResourceUser);
    config(): APIResource<TestRunConfig, NoQueryParams, TestRunsConfigData>;
}
export default APIListRuns;

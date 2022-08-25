import { QueryParams } from './HTTP';
export declare type UserStatistics = {
    devicesUsed: number;
    id: number;
    overallTestCaseSuccessRatio: number;
    runningTestRuns: number;
    totalTestRuns: number;
};
export interface StatisticQueryParams extends QueryParams {
    forWholeAccount: boolean;
    skipCommonProject: boolean;
    skipShared: boolean;
    startTime: number;
}

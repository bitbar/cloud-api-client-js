import {QueryParams} from './HTTP';

export type UserStatistics = {
  additionalUsers: number;
  allTimeProjects: number;
  devicesUsed: number;
  id: number;
  overallTestCaseSuccessRatio: number;
  runningTestRuns: number;
  totalTestRuns: number;
}

export interface StatisticQueryParams extends QueryParams {
  forWholeAccount: boolean;
  skipCommonProject: boolean;
  skipShared: boolean;
  startTime: number;
}


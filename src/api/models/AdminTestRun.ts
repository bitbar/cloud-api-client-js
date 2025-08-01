import {QueryParams} from './HTTP';
import {TestScheduler, TestState} from './TestRun';

export type AdminTestRun = {
  appCrawlerRun: boolean;
  createTime: number;
  duration: number;
  endTime: number;
  frameworkId: number;
  frameworkName: string;
  id: number;
  message: string;
  priority: number;
  projectId: number;
  projectName: string;
  scheduler: TestScheduler;
  startTime: number;
  startedById: number;
  state: TestState;
  successRatio: number;
  testRunName: string;
  userName: string;
}

export interface RunChangeBillableParams extends QueryParams {
  billable: boolean;
}

export interface RunChangePriorityParams extends QueryParams {
  priority: number;
}

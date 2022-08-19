import {CollectionResponse} from './HTTP';

export enum TestResult {
  PASSED = 'PASSED',
  FAILED = 'FAILED',
  SKIPPED = 'SKIPPED',
  NOT_AVAILABLE = 'NOT_AVAILABLE'
}

export enum TestStepType {
  ASSERTION = 'ASSERTION',
  CLICK = 'CLICK',
  CONFIG = 'CONFIG',
  DRAG = 'DRAG',
  INPUT = 'INPUT',
  NAVIGATION = 'NAVIGATION',
  OTHER = 'OTHER',
  SCROLL = 'SCROLL',
  UTIL = 'UTIL',
  WAIT = 'WAIT'
}

export type TestCaseRun = {
  className: string;
  createTime: number;
  duration: number;
  errorMessage: string;
  id: number;
  methodName: string;
  result: TestResult;
  stacktrace: string;
  steps: CollectionResponse<TestCaseRunStep>;
  suiteName: string;
}

export type TestCaseRunStep = {
  description: string;
  duration: number;
  errorMessage: string;
  fromActivity: string;
  id: number;
  screenshots: any;
  type: TestStepType;
}

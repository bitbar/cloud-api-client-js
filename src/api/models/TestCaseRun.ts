import {CollectionResponse} from "../APIList";

export type TestCaseRun = {
  className: string;
  createTime: number;
  duration: number;
  errorMessage: string;
  id: number;
  methodName: string;
  result: 'PASSED' | 'FAILED' | 'SKIPPED' | 'NOT_AVAILABLE';
  selfURI: string;
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
  type: 'ASSERTION' | 'CLICK' | 'CONFIG' | 'DRAG' | 'INPUT' | 'NAVIGATION' | 'OTHER' | 'SCROLL' | 'UTIL' | 'WAIT';
}

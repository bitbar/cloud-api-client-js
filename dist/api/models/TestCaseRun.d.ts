import { Method } from 'axios';
import { CollectionResponse } from './HTTP';
export declare enum TestResult {
    PASSED = "PASSED",
    FAILED = "FAILED",
    SKIPPED = "SKIPPED",
    NOT_AVAILABLE = "NOT_AVAILABLE"
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
};
export type TestCaseRunStep = {
    duration: number;
    httpMethod: Uppercase<Method>;
    id: number;
    requestBody: string;
    responseBody: string;
    responseCode: number;
    timestamp: number;
    uri: string;
};

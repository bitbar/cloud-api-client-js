import {CollectionBasicQueryParams} from "../APIList";
import {TestRunQueryParams} from "../APIListRuns";

export interface DeviceTimeSummaryQueryParams extends CollectionBasicQueryParams {
  forWholeAccount: boolean;
}

export interface DeviceUsageQueryParams extends TestRunQueryParams {
  startTime: number;
}

export interface DeviceStatisticQueryParam extends TestRunQueryParams {
  mode: string
}

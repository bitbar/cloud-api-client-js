import {DeviceSessionDataAvailability} from './DeviceSessionDataAvailability';
import {QueryParams} from './HTTP';

export type TestRunDataAvailability = {
  deviceRunDataAvailabilities: DeviceSessionDataAvailability[];
  id: number;
  testRunId: number;
}

export interface TestRunDataAvailabilityQueryParams extends QueryParams {
  userId: number;
}

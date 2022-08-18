import {Device} from './Device';
import {CollectionBasicQueryParams} from './HTTP';

export enum ScreenshotType {
  LANDSCAPE = 'LANDSCAPE',
  PORTRAIT = 'PORTRAIT'
}

export type Screenshot = {
  fail: boolean;
  id: number;
  originalName: string;
  takeTimestamp: number;
  type: ScreenshotType;
}

export type ScreenshotExtended = Screenshot & {
  device: Device;
  deviceRunId: number;
  projectId: number;
  testRunId: number;
}

export interface ScreenshotQueryParams extends CollectionBasicQueryParams {
  name: string;
}

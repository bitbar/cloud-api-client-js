import {Device} from "./Device";

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

export type ScreenshotExtended = {
  device: Device;
  deviceRunId: number;
  fail: boolean;
  id: number;
  originalName: string;
  projectId: number;
  takeTimestamp: number;
  testRunId: number;
  type: ScreenshotType;
}

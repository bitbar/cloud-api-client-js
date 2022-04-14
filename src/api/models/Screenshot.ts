export type ScreenshotType = 'LANDSCAPE' | 'PORTRAIT';

export type Screenshot = {
  fail: boolean;
  id: number;
  originalName: string;
  selfURI: string;
  takeTimestamp: number;
  type: ScreenshotType;
}

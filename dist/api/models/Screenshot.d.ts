import { Device } from './Device';
import { CollectionBasicQueryParams } from './HTTP';
export declare enum ScreenshotType {
    LANDSCAPE = "LANDSCAPE",
    PORTRAIT = "PORTRAIT"
}
export declare type Screenshot = {
    fail: boolean;
    id: number;
    originalName: string;
    takeTimestamp: number;
    type: ScreenshotType;
};
export declare type ScreenshotExtended = Screenshot & {
    device: Device;
    deviceRunId: number;
    projectId: number;
    testRunId: number;
};
export interface ScreenshotQueryParams extends CollectionBasicQueryParams {
    name: string;
}

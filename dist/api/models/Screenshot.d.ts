import { CollectionBasicQueryParams } from './HTTP';
export declare enum ScreenshotType {
    LANDSCAPE = "LANDSCAPE",
    PORTRAIT = "PORTRAIT"
}
export type Screenshot = {
    fail: boolean;
    id: number;
    originalName: string;
    takeTimestamp: number;
    type: ScreenshotType;
};
export interface ScreenshotQueryParams extends CollectionBasicQueryParams {
    name: string;
}
